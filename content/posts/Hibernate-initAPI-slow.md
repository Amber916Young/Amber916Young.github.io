---
title: "Hibernate-FIX: Why request the initial POST/PUT API takes long time in Hibernate Springboot"
date: 2023-05-13T20:14:29+01:00
lastmod: 2023-05-13T20:14:29+01:00
subTitle: ""
description: "Our project is Springboot + hibernate, each time I deploy the project to the cloud(not only the cloud, but also in the local dev), the first POST/PUT API need long time to execute. "
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Hibernate","RESTful"]
categories: ["Java","Hibernate","JPA"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---





## Discover 

Our project is Springboot + hibernate, each time I deploy the project to the cloud(not only the cloud, but also in the local dev), the first POST/PUT API need long time to execute. 

We make several assumptions:

- [ ] DNS lookup
- [ ] TCP Handshake and SSL Handshake 
- [ ] AWS RDS performance
- [x] Code problem

## Assumption 

### Assumption 1 --- DNS  lookup

In Postman, obviously it's an ideal time. So, move to the next.

<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/05/12/iuIPrV.png">
        <img src="https://i.328888.xyz/2023/05/12/iuIPrV.png" />
    </a>
</div>



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


<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/05/12/iuI9kc.png">
        <img src="https://i.328888.xyz/2023/05/12/iuI9kc.png" />
    </a>
</div>


However, troubleshooting in the backend is tedious.

Firstly, Warping the execution code:


{{< highlight java "linenos=table" >}}
long start = System.currentTimeMillis();
long end = System.currentTimeMillis();
log.error("Elapsed Time in milli seconds: "+ (end-start));
{{< /highlight >}}



For example:

In controller:


{{< highlight java "linenos=table" >}}
@PostMapping(produces = "application/json")
public ResponseEntity<SupplierOrderDTO> createSupplierOrder(
    @Valid @RequestBody SupplierOrderDTO supplierOrderDTO) {
    long start = System.currentTimeMillis();

    SupplierOrder savedSupplierOrder = supplierOrderService.createOrder(
            supplierOrderMapper.toEntity(supplierOrderDTO));
    long end = System.currentTimeMillis();
    log.error("Elapsed Time in milli seconds: "+ (end-start));
    return new ResponseEntity<>(supplierOrderMapper.toDTO(savedSupplierOrder), HttpStatus.CREATED);
}
{{< /highlight >}}

In service :



{{< highlight java "linenos=table" >}}
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
{{< /highlight >}}

Print all the sql statement, we need to change some configuration in yml file:

{{< highlight yml "linenos=table" >}}
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
{{< /highlight >}}



Then package the project run in inbuilt tomcat. Run this CLI in terminal under the target folder.


{{< highlight bash "linenos=table" >}}
 java -jar (warname).war  
{{< /highlight >}}

After the program start, head to Postman, run "create an order api".



<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/05/12/iuN8OP.png">
        <img src="https://i.328888.xyz/2023/05/12/iuN8OP.png" />
    </a>
</div>




It takes 17s!!!!!  `insert` method takes 16s, so let's head to source code.



<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/05/12/iuNXSV.png">
        <img src="https://i.328888.xyz/2023/05/12/iuNXSV.png" />
    </a>
</div>






In the **save** method, before execute the creaete an order(add a new record to DB), the inner method will check the entity is already in the DB or not, so it will query in the DB. In fact, when I execute [persist] method. It faster than before. So I suppose, something happened in isNew function.

I found a solution finally. Just overwrite the isNew function in each entity class.

https://stackoverflow.com/questions/27573023/how-spring-data-jpa-decides-to-call-entitymanager-persist-or-entitymanager-me

<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/05/12/iuNEzq.png">
        <img src="https://i.328888.xyz/2023/05/12/iuNEzq.png" />
    </a>
</div>


When I depoly to the cloud and execute the create function, it only takes 1s in the initial request!


<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://i.328888.xyz/2023/05/12/iuNe1z.png">
        <img src="https://i.328888.xyz/2023/05/12/iuNe1z.png" />
    </a>
</div>


I am not sure it is a temporary fix or not.....