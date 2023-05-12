# Amber916Young.github.io

https://amber916young.github.io/



## Hibernate-FIX: Why request the initial POST/PUT API takes long time in Hibernate Springboot

## Discover 

Our project is Springboot + hibernate, each time I deploy the project to the cloud(not only the cloud, but also in the local dev), the first POST/PUT API need long time to execute. 

We make several assumptions:

- [ ] DNS lookup
- [ ] TCP Handshake and SSL Handshake 
- [ ] AWS RDS performance
- [x] Code problem

### Assumption 1 --- DNS  lookup

In Postman, obviously it's an ideal time. So, move to the next.

<a href="https://imgloc.com/i/iuIPrV"><img src="https://i.328888.xyz/2023/05/12/iuIPrV.png" alt="iuIPrV.png" border="0" /></a>





### Assumption 2 ---TCP/SSL Handshake 

Check the speed of handshake. Here is CLI, there is no any exception. So, move to the next.

```bash
curl -w "TCP handshake: %{time_connect}, SSL handshake: %{time_appconnect}\n" -so /dev/null https://{your domain}

TCP handshake: 0.057688, SSL handshake: 0.100967
```

### Assumption 3 --- AWS RDS 

How to troubleshoot this problem? I run the server locally and connect to the AWS RDS as a DB source. as long as the server run locally, there is no any delay between RDS and backend, in other words, the problem is not related to RDS.  Definitely code leads to potential  bugs.



### Assumption 4



This screenshot already told me where is the problem happend there.

<a href="https://imgloc.com/i/iuI9kc"><img src="https://i.328888.xyz/2023/05/12/iuI9kc.png" alt="iuI9kc.png" border="0" /></a>

However, troubleshooting in the backend is tedious.

Firstly, Warping the execution code:

```
long start = System.currentTimeMillis();
long end = System.currentTimeMillis();
log.error("Elapsed Time in milli seconds: "+ (end-start));
```

For example:

In controller:

```
@PostMapping(produces = "application/json")
public ResponseEntity<SupplierOrderDTO> createSupplierOrder(@Valid @RequestBody SupplierOrderDTO supplierOrderDTO) {
    long start = System.currentTimeMillis();

    SupplierOrder savedSupplierOrder = supplierOrderService.createOrder(
            supplierOrderMapper.toEntity(supplierOrderDTO));
    long end = System.currentTimeMillis();
    log.error("Elapsed Time in milli seconds: "+ (end-start));
    return new ResponseEntity<>(supplierOrderMapper.toDTO(savedSupplierOrder), HttpStatus.CREATED);
}
```

In service :

```
public SupplierOrder createOrder(SupplierOrder newSupplierOrder) {
    long start = System.currentTimeMillis();

    SupplierOrder savedSupplierOrder = saveOrder(newSupplierOrder);
 
    long end = System.currentTimeMillis();
    log.error("Elapsed Time in milli seconds: "+ (end-start));
    
    return savedSupplierOrder;
}
  private SupplierOrder saveOrder(SupplierOrder supplierOrderToSave) {
        long start = System.currentTimeMillis();

        SupplierOrder supplierOrder =  supplierOrderRepository.save(supplierOrderToSave);

        long end = System.currentTimeMillis();
        log.error("Elapsed Time in milli seconds: "+ (end-start));
        
        return supplierOrder;
    }
```

Print all the sql statement, we need to change some configuration in yml file:

```
jpa:
  database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
  database: MYSQL
  show-sql: true #show sql
  properties:
    hibernate.id.new_generator_mappings: true
    hibernate.cache.use_second_level_cache: false
    hibernate.cache.use_query_cache: false
    hibernate.format_sql: true  #show sql
    hibernate.generate_statistics: true  #show sql
```

Then package the project run in inbuilt tomcat. Run this CLI in terminal under the target folder.

```
 java -jar (warname).war          
```

After the program start, head to Postman, run "create an order api".



<a href="https://imgloc.com/i/iuN8OP"><img src="https://i.328888.xyz/2023/05/12/iuN8OP.png" alt="iuN8OP.png" border="0" /></a>



It takes 17s!!!!!  `insert` method takes 16s, so let's head to source code.



<a href="https://imgloc.com/i/iuNXSV"><img src="https://i.328888.xyz/2023/05/12/iuNXSV.png" alt="iuNXSV.png" border="0" /></a>



In the **save** method, before execute the creaete an order(add a new record to DB), the inner method will check the entity is already in the DB or not, so it will query in the DB. In fact, when I execute [persist] method. It faster than before. So I suppose, something happened in isNew function.

I found a solution finally. Just overwrite the isNew function in each entity class.

https://stackoverflow.com/questions/27573023/how-spring-data-jpa-decides-to-call-entitymanager-persist-or-entitymanager-me

<a href="https://imgloc.com/i/iuNEzq"><img src="https://i.328888.xyz/2023/05/12/iuNEzq.png" alt="iuNEzq.png" border="0" /></a>

When I depoly to the cloud and execute the create function, it only takes 1s in the initial request!

<a href="https://imgloc.com/i/iuNe1z"><img src="https://i.328888.xyz/2023/05/12/iuNe1z.png" alt="iuNe1z.png" border="0" /></a>





I am not sure it is a temporary fix or not.....
