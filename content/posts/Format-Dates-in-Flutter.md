---
title: "Format Dates in Flutter"
date: 2023-05-21T09:59:17+01:00
lastmod: 2023-05-21T09:59:17+01:00
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Format Date"]
categories: ["flutter"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---

The article from [geeksforgeeks](https://www.geeksforgeeks.org/format-dates-in-flutter/)

The Dart in-built method, for formatting, dates in Flutter according to the requirements is very limited and restrictive. While dealing with dates it should be in human-readable format but unfortunately, there’s no way of formatting dates in flutter unless you make use of a third-party package.



 In this article, we will look into one such package known as the intl package.  
## intl package
### Using intl package
Add the following dependencies to your pubspec.yaml file, you can find the latest dependencies here.


{{< highlight yml "linenos=table" >}}
dependencies:
  intl: ^0.17.0
{{< /highlight >}}


### Add using terminal
You can also get the latest intl library using terminal easily: 

{{< highlight bash "linenos=table" >}}
flutter pub add intl
{{< /highlight >}}


Import it:
That’s it now import intl package in your Dart code:



{{< highlight dart "linenos=table" >}}
import 'package:intl/intl.dart';
{{< /highlight >}}

Still, if you face any error using intl, simply use the following command:

{{< highlight bash "linenos=table" >}}
flutter pub get
{{< /highlight >}}

Now let’s take a look at the below example.

### Example

In the below code we will not be using the intl package for formatting. Also, take a look at the output of the below code.

{{< highlight dart "linenos=table" >}}
import 'package:flutter/material.dart';

void main() {
runApp(dateDemo());
}

class dateDemo extends StatelessWidget {
@override
Widget build(BuildContext context) {
	return MaterialApp(
	
	// browser tab title
	title: "Geeksforgeeks",
	
	// Body
	home: Scaffold(
		
		// AppBar
		appBar: AppBar(
			
			// AppBar color
			backgroundColor: Colors.green.shade900,
			
			// AppBar title
			title: Text("Geeksforgeeks"),		
		),
		
		// Container or Wrapper
		body: Container(						
			margin: EdgeInsets.fromLTRB(95, 80, 0, 0),
			
			// printing text on screen
			child: Text(						
			
			// Formatted Date
			// Builtin format / without formatting
			DateTime.now().toString(),		
			style: TextStyle(
				
				// Styling text
				fontWeight: FontWeight.bold, fontSize: 30),
			),
		)),
	);
}
}

{{< /highlight >}}
<div class="polaroid" style="width:20%" >
   <a data-fancybox="gallery" data-src="https://media.geeksforgeeks.org/wp-content/uploads/20210903162212/noformat-244x300.png">
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210903162212/noformat-244x300.png"/>
    </a>
</div>

## More DateFormat Functions
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>



|                  Use                  |           Description           |         Example          |
| :-----------------------------------: | :-----------------------------: | :----------------------: |
|   DateFormat.yMMMEd().format(date)    | Day Name ,Month Name ,Date,Year |     Fri, Sep 3, 2021     |
|     DateFormat.MEd().format(date)     | Day Name,Month/Date in Numbers  |        Fri , 9/3         |
| DateFormat.MMMMEEEEd().format(date))  |     DayName,MonthName Date      |   Friday ,September 3    |
| DateFormat.yMMMMEEEEd().format(date)) |  DayName ,MonthName Date,Year   | Friday ,September 3,2021 |
|    DateFormat.EEEE().format(date)     |        Full DayName only        |          Friday          |
|      DateFormat.E().format(date)      |          Short DayName          |           Fri            |
|      DateFormat.M().format(date)      |          Month-Number           |            9             |
|     DateFormat.MMM().format(date)     |         Short MonthName         |           Sep            |
|    DateFormat.LLLL().format(date)     |         Full MonthName          |        September         |
|      DateFormat.j().format(date)      |        Current Time only        |           4 PM           |


<div class="polaroid" style="width:20%" >
   <a data-fancybox="gallery" data-src="https://media.geeksforgeeks.org/wp-content/uploads/20210903171030/all-173x300.png">
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210903171030/all-173x300.png"/>
    </a>
</div>

