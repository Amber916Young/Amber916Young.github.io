---
title: "Customize search bar in Flutter"
date: 2023-04-30T13:47:34+01:00
lastmod: 2023-04-30T13:47:34+01:00
subTitle: "subTitle"
description: "In this section, you will learn listen value changes by using the state management riverpod and how to build a standalone search text area"
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["riverpod","state-management"]
categories: ["flutter","riverpod"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---


## What's effect we can to realise?

<div class="polaroid" style="width:70%" >
   <a data-fancybox="gallery" data-src="https://i.328888.xyz/2023/04/30/iLiJxq.png">
        <img src="https://i.328888.xyz/2023/04/30/iLiJxq.png"/>
    </a>
  <div class="container">
    <p> Custom search bar </p>
  </div>
</div>
The search bar can be used in any listview page,when user texts something in different page should list the correct outcome. 

<br>

## Customise text input
<br>

### ✨ Encapsulate TextFormField
<br>

 [TextFormField](https://api.flutter.dev/flutter/material/TextFormField-class.html)
 widget is used to take input from the user in flutter. This is a simple and easy user input widget in flutter.

We can perform any operation on that user input data using TextFormField. You can use that user input, can send and show that input. You can store it into a TextEditingController type object.

In TextFormField, controller is important to monitor the text user input.  focusNode is to monitor user wheater click the text bar.

In this search bar, when the text is empty, the suffix icon is "search", whereas should be "close" icon.

<br>

{{< highlight java "linenos=table" >}}


class CustomInputSearch extends ConsumerWidget {
  final TextEditingController controller = TextEditingController();
  final FocusNode? focusNode;

  CustomInputSearch({key,  this.focusNode });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final size = Applayout.getSize(context);
    final searchNotifier = ref.watch(searchProvider);
    print("CustomInputSearch ${controller.text}");
    return Container(
      height: Applayout.getHeight(50),
      width: Applayout.getHeight(size.width * .8),
      margin: EdgeInsets.symmetric(
        horizontal: size.width * 0.1, vertical: Applayout.getHeight(10),
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(Applayout.getHeight(10)),
        color: Styles.bgColor2,
      ),
      child: TextFormField(
        focusNode:  focusNode?? FocusNode(),
        onChanged: (value){
          searchNotifier.setSearchValue(value);
        },
        controller: controller,
        autofocus: false,
        decoration: InputDecoration(
          contentPadding: EdgeInsets.symmetric(
            horizontal: Applayout.getWidth(20),
            vertical: Applayout.getHeight(14),
          ),
          alignLabelWithHint: true,
          floatingLabelAlignment: FloatingLabelAlignment.start,
          suffixIcon: controller.text.trim().isNotEmpty
              ? IconButton(
            icon: Icon(Icons.clear_rounded, color: Styles.orangeColor),
            onPressed: () {
              controller.clear();
              FocusManager.instance.primaryFocus?.unfocus();
              searchNotifier.clearSearch();
            },) : IconButton(
            icon: Icon(Icons.search, color: Styles.whiteColor),
            onPressed: null,),
          border: InputBorder.none,
          hintText: 'Search ...',
          hintStyle: Styles.textStyle,
        ),
      ),
    );
  }
}
{{< /highlight >}}
<br>

### 📍 Use it in anywhere
<br>

It's very simple to use it. beacuse we use riverpod to monitor the textinput, we don't need to pass textcontroller to watch value changes.
<br>

{{< highlight java "linenos=table" >}}
  final FocusNode _searchFocusNode = FocusNode();
    .....

// general use

 CustomInputSearch( focusNode: _searchFocusNode, )

// using in riverpod.

ProviderScope(child: CustomInputSearch(
    focusNode: _searchFocusNode,
),),
{{< /highlight >}}

<br>

## 👉 Monitor text changes and filter the target data by using Riverpod 

<br>
Riverpod is a state management library for Flutter developed by the same team behind the Provider library. Riverpod is designed to provide an improved API for managing state in Flutter apps, with a focus on performance, simplicity, and flexibility.

<br>

Riverpod uses a concept called "Scoped Providers" to manage state within an app. A Scoped Provider is a function that takes a context and returns an object. The Scoped Provider is responsible for creating and managing the state for that object within the scope of the widget tree.


<br>

### Import riverpod plugin

<br>

Here is [riverpod](https://riverpod.dev/docs/getting_started) offical website. 

<br>

{{< highlight bash "linenos=table" >}}
environment:
  sdk: ">=2.17.0 <3.0.0"
  flutter: ">=3.0.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.3.6
{{< /highlight >}}

<br>


## watch(provider) & read(provider)


In Riverpod, watch and read are two ways to access the state of a provider. Here's what they do:

<br>

### watch(provider)


<br>
Returns a value that will rebuild the widget tree whenever the state of the provider changes.
Should be used inside a widget's build method to subscribe to changes in state.
Returns a T object that can be accessed using the .state property. For example: watch(counterProvider).state
Here's an example of how to use watch to subscribe to changes in a counter:
{{< highlight java "linenos=table" >}}
class MyCounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.watch(counterProvider).state;
    return Text('Counter: $counter');
  }
}

{{< /highlight >}}

<br>

 ### read(provider):

<br>

Returns the current value of the provider without subscribing to future changes.
Should be used outside of a widget's build method, such as in a button press or event handler.
Returns a T object that can be accessed using the .state property. For example: final counter = context.read(counterProvider).state
Here's an example of how to use read to get the current value of a counter and update it:

<br>

{{< highlight java "linenos=table" >}}
class MyButtonWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      child: Text('Increment Counter'),
      onPressed: () {
        final counter = context.read(counterProvider);
        counter.state++;
      },
    );
  }
}

{{< /highlight >}}

It's important to note that you should use watch inside a widget's build method and read outside of it. Using read inside a build method can lead to unnecessary widget rebuilds and performance issues. Additionally, it's generally recommended to use watch over read whenever possible, as watch provides a more reactive and efficient approach to managing state in Riverpod.



<br>



## Create a SearchNotifier.dart file 

<br>

{{< highlight java "linenos=table" >}}

import 'package:flutter/cupertino.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';


class SearchNotifier extends ChangeNotifier {
  Ref ref;
  String state = "";

  SearchNotifier(this.ref) {
    state = "";
  }

  void setSearchValue(String value) {
    state = value;
    notifyListeners();
  }

  String get searchValue => state;

  set searchValue(String value) {
    setSearchValue(value);
    notifyListeners();
  }

  void clearSearch() {
    state = "";
    notifyListeners();
  }
}

final searchProvider = ChangeNotifierProvider.autoDispose<SearchNotifier>((ref) {
  return SearchNotifier(ref);
});


{{< /highlight >}}

<br>

In search bar, "watch" means when the value changed, the lasted value can be catched.
 
<br>


{{< highlight java "linenos=table" >}}
final searchNotifier = ref.watch(searchProvider);
{{< /highlight >}}

<br>

## Filter data based on text value

<br>

In the listview page, "watch" the value in the real time. "cartListProvider" is another part to access data using RESTful api. We can define a function call "filterOrders" to filter the data.

<br>

{{< highlight java "linenos=table" >}}
final value = ref.watch(searchProvider).state;

filteredData =  ref.read(cartListProvider(supplierId)).filterOrders(value);

{{< /highlight >}}



<br>
In cartListProvider.dart.

{{< highlight java "linenos=table" >}}
 List<SupplierProductModel> filterOrders(String _searchString) {
    String lowerValue = _searchString.toLowerCase();
    final filteredData = list.where((item) =>
        item.productName!.toLowerCase().contains(lowerValue)
    ).toList();
    return filteredData;
  }
{{< /highlight >}}
 
<br>

Thanks.

<br>

<br>
