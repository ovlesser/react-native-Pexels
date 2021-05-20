
# Build an image browsing App with React Native

React Native brings React’s declarative UI framework to iOS and Android. With React Native, you use native UI controls and have full access to the native platform. (https://github.com/facebook/react-native)

Mobile devices are becoming more and more popular nowadays, so building their own app and accessing the backend service from mobile devices are essential to many companies. We know iOS and Android devices covers the majority of the market share, and the App on iOS and Android are incompatible to each other. It means the developers need to develop two different Apps with different tech stack on two platforms. The development might not too difficult, but to maintain two Apps with same delivery pace might be tricky. So some developers would like to choose some cross-platform solution, such as Ionic, Flutter, Xamarin, to implement their App. React Native is another choice to develop such cross-platform Apps.

In this tutorial, we will address some basic concepts of React Native, and build an image App with React Native. We will cover React Native basics, React Hooks, FlatList, Search Bar, Navigation. This tutorial will be written in TypeScript, which is pretty similar with JavaScript, but the type check is enforced.

And I assume the readers of this tutorial have some basic knowledge of JavaScript / TypeScript, Android and iOS. So there is no details about the syntax and development tools.

And in this tutorial, we will build a two-screens App, the first screen is a home page, on which we will display a list of images fetched from backend API, and a search bar to let user input keyword of the images; and the second screen is a detail page, to which the user can navigate by clicking a single image on the list.

## Prerequisite

This App will fetch images from [Pexels](https://www.pexels.com/), so before starting building the App, we need to create a Pexels account if you don’t have one. We won’t focus on how to create the Pexels account, because it is out of scope of this tutorial. But It is pretty easy to create new account based on the instruction on Pexels.

We need to save the Authorization Token in safe place, which is the key to access Pexels API and will be used in the app.

Then we can do some testing to the Pexels API with Postman to make sure our Authorization Token is correct and we are able to fetch photos for Pexels.

![](https://cdn-images-1.medium.com/max/5200/0*iRCvl1TNXnGXRnO7.png)

Pay attention you need to replace the Authorization Token in the Headers with the real value you got when you created the Pexels account.

And then if we are lucky, we will get a response in JSON format like this:

    {
      page: 1,
      per_page: 2,
      photos: [
        {
          id: 1105666,
          width: 6720,
          height: 4480,
          url: '[https://www.pexels.com/photo/people-at-concert-1105666/'](https://www.pexels.com/photo/people-at-concert-1105666/'),
          photographer: 'Vishnu R Nair',
          photographer_url: '[https://www.pexels.com/@vishnurnair'](https://www.pexels.com/@vishnurnair'),
          photographer_id: 426592,
          avg_color: '#543421',
          src: {
            original:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'),
            large2x:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
            large:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
            medium:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=350'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=350'),
            small:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=130'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=130'),
            portrait:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'),
            landscape:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'),
            tiny:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'),
          },
          liked: false,
        },
        {
          id: 15286,
          width: 2500,
          height: 1667,
          url:
            '[https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'](https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'),
          photographer: 'Luis del Río',
          photographer_url: '[https://www.pexels.com/@luisdelrio'](https://www.pexels.com/@luisdelrio'),
          photographer_id: 1081,
          avg_color: '#283419',
          src: {
            original: '[https://images.pexels.com/photos/15286/pexels-photo.jpg'](https://images.pexels.com/photos/15286/pexels-photo.jpg'),
            large2x:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
            large:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940'),
            medium:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'),
            small:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=130'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=130'),
            portrait:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'),
            landscape:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'),
            tiny:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'),
          },
          liked: false,
        },
      ],
      total_results: 8000,
      next_page: '[https://api.pexels.com/v1/search/?page=2&per_page=2&query=people'](https://api.pexels.com/v1/search/?page=2&per_page=2&query=people'),
    }

If we analyse the JSON object, we would get the schema is

    {
      page: number,
      per_page: number,
      photos: Array<Photo> ,
      total_result: number,
      next_page: string
    }

and the schema of Photo is

    {
      id: number,
      width: number,
      height: number,
      url: string,
      photographer: string,
      photographer_url: string,
      photographer_id: number,
      avg_color: string,
      src: Src,
      liked: boolean,
    }

and the schema of Src is

    {
      original: string,
      large2x: string,
      large: string,
      medium: string,
      small: string,
      portrait: string,
      landscape: string,
      tiny: string
    }

We need these schemas when we create data models

And then we can start to build the App once we verified the Pexels API is accessible.

## Setting up the development environment

Then we need to setup the development environment and. According to the official document ([Setting up the development environment](https://reactnative.dev/docs/environment-setup)), there are two ways to create a new project, with Expo or withe React Native CLI. We would use React Native CLI in the tutorial.

Because we need Xcode to make the App running on iOS devices, so I would follow the instructions on MacOS. I won’t talk too much details about how to install the dependencies because it is quite clear in the above official document.

After all dependencies are installed, let’s create a new project with React Native CLI (React Native Command Line Interface) by running following command in a terminal

    npx react-native init Pexels --template react-native-template-typescript

It might take several minutes because there are lots of dependencies need to be installed. Be careful we have a parameter —-template react-native-template-typescript in the command. It means we are creating a project with TypeScript template.

And you would find a new folder, Pexels, has been created in current working directory, which is the whole React Native project.

You can choose any preferred editor to open this project, but I would like to use VSCode. So Let’s open this folder with VSCode. So we would see the whole structure of the project at left as

![](https://cdn-images-1.medium.com/max/2480/1*T5i8myIm2qD94GAqsnCmlQ.png)

The React Native CLI had generated the skeleton of the project for us. The index.js is the entry of the project, the App.tsx, in which you can find some sample components to display some views, and the package.json, which is the manifest file of the project, in which some running scripts and dependencies are declared.

Ok. You might be curious how to run this React Native App? So Let’s do it.

Run following command in the terminal:

    cd Pexels
    npx react-native run-ios

You would see the output in the terminal as followed:

![](https://cdn-images-1.medium.com/max/2000/1*b9FM--1-pV2UNCDs6TIXUQ.png)

An iOS simulator would be launched and a new terminal would be popped up as followed:

![](https://cdn-images-1.medium.com/max/2928/1*14jixtbWSsXPfftvUuOkyw.png)

and you would see the following message in the first terminal if everything works fine.

![](https://cdn-images-1.medium.com/max/2000/1*mVeyGnQJQiTzdv4_Vz5Ecg.png)

And you would see the app is running on the iOS simulator as followed:

![](https://cdn-images-1.medium.com/max/2000/1*KaLyXlF1doN19op_UZfj4A.png)

Then if you are familiar with React, you can try to find the components of this App skeleton from the App.tsx.

So far so good. Then let’s stop the Metro server running on the second terminal, close the App on the iOS simulator and implement our App based on this App skeleton.

## Clear up the lint problems

You might see lots of lint problems if you open the App.tsx file if you have installed the eslint plugin to your VSCode. So let’s fix these problems first by putting the mouse cursor on one lint problem and select Quick Fix when a pop up menu appears as followed:

![](https://cdn-images-1.medium.com/max/2882/1*ZXe5oU2mIY3VuC-BpBJrGA.png)

And select Fix all auto-fixable problems as followed:

![](https://cdn-images-1.medium.com/max/2000/1*uzdTjmXXWQ_p9ohq25Yk3w.png)

With this command, all format problems like spacing, comma and etc. would be fixed. Then the code looks prettier. You could run this command at anytime when you find such lint problem after you modify the source code or add new code.

Then let’s add the data models next step

## Add Data models

I would suggest create a new folder, src, first and put all our code in it for sake of the tidiness of the project structure.

And create another folder, @types, in the src folder. We will put all type definitions in this folder.

Then let’s create a new file, Data.d.ts, in @types folder, and define following interfaces in this file

    interface Src {
     original: string;
     large2x: string;
     large: string;
     medium: string;
     small: string;
     portrait: string;
     landscape: string;
     tiny: string;
    }

    interface Photo {
     id: number;
     width: number;
     height: number;
     url: string;
     photographer: string;
     photographer_url: string;
     photographer_id: number;
     avg_color: string;
     src: Src;
     liked: boolean;
     keyword: string;
    }

    interface Data {
     page: number;
     per_page: number;
     photos: Array < Photo > ;
     total_results: number;
     next_page: string;
    }

We could see we defined an interface called Data, which maps the whole response JSON from the backend, and another interface, Photo, which is corresponding the JSON object of single photo, and the third interface, Src, which contains all urls of the photo. These interfaces are matching the schemas of the JSON object in the response.

## Build the Home component

We would build a new component, Home, in which we will display a list of the photos.

The first step we need to do is moving the App.tsx to src folder by dragging this file to the src folder. And the VSCode would refactor all placed referenced this file, so you just need to accept the changes. This step would make the project structure clearer. As we said before, we will put all source code in src folder.

And let’s create a new folder under src folder, named home, in which we will put all home page related files,

and create a new file, Home.tsx in this folder, and create a new function component, Home, as followed:

    import React from 'react';
    import {StyleSheet, StatusBar, SafeAreaView, Text} from 'react-native';
    import List from './List';
    import {sampleData} from './SampleData';

    const Home = () => {
      const data = sampleData;
      return data && !!data.photos ? (
        <SafeAreaView style={styles.container}>
          <List data={data.photos} />
        </SafeAreaView>
      ) : (
        <Text />
      );
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0 + 0,
        marginHorizontal: 0,
      },
    });

    export default Home;

Be careful, we haven’t implemented dependencies, List and sampleData, so there would be some highlighted warnings. We will fix them later.

This a very simple function component, Home, in which we defined the List component inside the [SafeAreaView](https://reactnative.dev/docs/safeareaview) if there are some photos to display. The purpose of SafeAreaView is to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices with iOS version 11 or later.

Let’s solve the sampleData first. Because we haven’t implement the network request, so we would show the list with local data. We need to create a file, SampleData.ts in home folder, and define a variable sampleData with following value as shown:

    export const sampleData = {
      page: 1,
      per_page: 2,
      photos: [
        {
          id: 1105666,
          width: 6720,
          height: 4480,
          url: '[https://www.pexels.com/photo/people-at-concert-1105666/'](https://www.pexels.com/photo/people-at-concert-1105666/'),
          photographer: 'Vishnu R Nair',
          photographer_url: '[https://www.pexels.com/@vishnurnair'](https://www.pexels.com/@vishnurnair'),
          photographer_id: 426592,
          avg_color: '#543421',
          src: {
            original:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'),
            large2x:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
            large:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'),
            medium:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=350'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=350'),
            small:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=130'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&h=130'),
            portrait:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'),
            landscape:
              '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'),
            tiny: '[https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'](https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'),
          },
          liked: false,
        },
        {
          id: 15286,
          width: 2500,
          height: 1667,
          url: '[https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'](https://www.pexels.com/photo/person-walking-between-green-forest-trees-15286/'),
          photographer: 'Luis del Río',
          photographer_url: '[https://www.pexels.com/@luisdelrio'](https://www.pexels.com/@luisdelrio'),
          photographer_id: 1081,
          avg_color: '#283419',
          src: {
            original: '[https://images.pexels.com/photos/15286/pexels-photo.jpg'](https://images.pexels.com/photos/15286/pexels-photo.jpg'),
            large2x:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
            large:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940'),
            medium:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'),
            small:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=130'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=130'),
            portrait:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'),
            landscape:
              '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'),
            tiny: '[https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'](https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280'),
          },
          liked: false,
        },
      ],
      total_results: 8000,
      next_page: '[https://api.pexels.com/v1/search/?page=2&per_page=2&query=people'](https://api.pexels.com/v1/search/?page=2&per_page=2&query=people'),
    };

Actually, this value is the response JSON object from the backend API. It has same schema as the response from real network request. So our code would handle the real response if it can handle this sample data.

And the let us implement the List component by creating a new file, List.tsx, and a new function component, List, in this file as shown:

    import React from 'react';
    import {
     StyleSheet,
     FlatList,
     StatusBar
    } from 'react-native';
    import Item from './Item';

    const List = ({
     data
    }: {
     data: Array < Photo >
    }): JSX.Element => {
     const renderItem = ({
      item
     }: {
      item: Photo
     }) => < Item photo = {
      item
     }
     />;
     return ( <
      FlatList style = {
       styles.container
      }
      data = {
       data
      }
      numColumns = {
       2
      }
      renderItem = {
       renderItem
      }
      keyExtractor = {
       (item: Photo) => item.id.toString()
      }
      />
     );
    };

    const styles = StyleSheet.create({
     container: {
      flex: 1,
      // flexDirection: 'row',
      paddingTop: StatusBar.currentHeight || 0 + 0,
      marginHorizontal: 0,
     },
    });

    export default List;

In this file, we implemented a function component, List with the standard React Native component, FlatList. And we would display the photos with two columns, and render them in an Item component, which would be added later.

So let us implement the Item component by creating a new file, Item.tsx in home folder, and add a new function component, Item, in this file as followed:

    import React from 'react';
    import {
     StyleSheet,
     Image,
     Dimensions
    } from 'react-native';
    const deviceWidth = Dimensions.get('window').width;

    const Item = ({
     photo
    }: {
     photo: Photo
    }): JSX.Element => {
     return ( <Image
       style = {styles.item}
       resizeMode = {'cover'}
       source = {{uri: photo.src.medium}}
      />
     );
    };

    const styles = StyleSheet.create({
     container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
     },
     item: {
      backgroundColor: 'aqua',
      margin: 4,
      width: deviceWidth / 2 - 4 * 2,
      height: 200,
     },
    });

    export default Item;

In this Item component, we are displaying the photo with standard Image component, which supports displaying network image with uri.

We have implemented the Home component, List component and the Item component to display the photos in a list, now let us assemble them together.

Let us go back to the App.tsx and replace it as followed:

    import React from 'react';
    import {SafeAreaProvider} from 'react-native-safe-area-context';
    import Home from './home/Home';

    const App = () => {
      return (
        <SafeAreaProvider>
          <Home />
        </SafeAreaProvider>
      );
    };
    export default App;
    

It is very simple and straightforward, just displaying the Home component in a SafeAreaProvider. You might need to install react-native-safe-area-context package with following command if you haven’t install it before.

    yarn add react-native-safe-area-context

The SafeAreaProvider would make sure all components would be displayed in safe area even on iPhoneX and onward devices.

So far we have build up the basic React Native App with local data. You might want to run it. But before running the App, you might need the App installed on simulator or device. Although you can build and run it with command line

    npx react-native run-ios

I still think it worth to build it with Android Studio for Android App or Xcode for iOS App. So run following command in a terminal:

    cd ios/; pod install; cd ..

and open the ios project with Xcode by dragging ios folder into Xcode, and build the App.

and run the Metro server with following command in a terminal

    yarn start --reset-cache

and run the Pexels App from the device, you would see the app is running like:

![](https://cdn-images-1.medium.com/max/2000/1*A0kBk157nZEnpR4AzEwvpg.png)

As we see, there are two images are displayed, which are from local sample data, and the whole app wouldn’t interfere the system area.

So far so good. And we will display the real data fetched from backend API instead of local data in next chapter.

## Fetch data from backend API

Actually, fetching data from backend API with React Native is very simple. We could implement this function with [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). So we just added a local function, fetchData, in the Home component as shown:

    const [data, setData] = useState<Data>();
    const fetchData = async (
      query: string = 'panda',
      pageIndex: number = 0,
      perPage: number = 20,
    ) => {
      try {
        const url = `https://api.pexels.com/v1/search?query=${query}&page=${pageIndex}&per_page=${perPage}`;
        const response = await fetch(url, {
          headers: {
            Authorization:
              '<*authorization token>*',
          },
        });
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

Please change the authorization token to yours, which you got when you signed up the Pexels account.

And as we see, we defined the function fetchData as an async function, so we can avoid the callbacks and make the code easy to read. This function is pretty simple, just fetching the data with Fetch API, and saving the response locally.

You might notice we are using React Hooks here. Please check official document about it at [https://reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html). We are setting the data with setData once we get the data from backend.

And then we also need to call this fetchData function at proper time, so we need to add following code in the Home component:

    useEffect(() => {
      if (!data) {
        (async () => await fetchData())();
      }
    });

As we see, we would call fetchData function in Effect Hook and if there is no data has been fetched.

You might also add some new import as

    import React, {useState, useEffect} from 'react';

and remove unused sampleData related code and dependencies.

Then let us run the app again, it would be displaying the real data from backend API as shown:

![](https://cdn-images-1.medium.com/max/2000/1*Dlw87jEOITg38yywmZ57ZQ.png)

Why panda? It is because we are using hardcoded keyword, panda, to fetch the image from backend API. We will update it later.

## Add network error icon

At a complementary part of network fetching, we also need to display an error icon if the the data fetching is failed, to let user knows what happened.

I would introduce react-native-vector-icon package because there are lots of modern designed icons in this package. So please install it according to the instruction in the [https://www.npmjs.com/package/react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons).

And after installing the react-native-vector-icons package, you need to run

    cd ios/; pod install; cd ..

and you would see message like

![](https://cdn-images-1.medium.com/max/2000/1*XlNR-xy9FcN8dpi44yO-XQ.png)

and you also need to rebuild the App with Xcode because there are some font libraries need to be installed in the App.

And we also need to update the Home component as followed:

Firstly, let’s add a new state hook regarding to the network error

    const [error, setError] = useState<Error>();

and call setError() if the fetching is failed as shown:

    } catch (error) {
      setError(error);
    }

and then add a new component, icon like

    const icon = error ? (
       <Icon name={'cloud-off'} style={styles.icon} size={160} color={'grey'} />
    ) : undefined;

and wrap the list component in a variable like

    const list =
      data && !!data.photos && data.photos.length > 0 ? (
        <List data={data.photos} />
      ) : undefined;

and update the Home component as followed

    return (
      <SafeAreaView style={styles.container}>
        {list}
        {icon}
      </SafeAreaView>
    );

and also add a new style in the styles object as shown:

    icon: {
      position: 'absolute',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      top: '40%',
    },

and add dependency as followed:

    import Icon from 'react-native-vector-icons/MaterialIcons';

Now we can turn on the airplane mode of the device and run the App, it would show a cloud-off icon instead of the list like

![](https://cdn-images-1.medium.com/max/2000/1*hxB-Ww2j_y_a8fzkE4Lqtg.png)

So far we have implemented the network accessing but there is still a fatal issue that it is displaying 20 photos in total, and no more photos would be loaded even we scroll to the bottom. We will add pagination in next chapter.

## Add pagination

Let us open the List.tsx and add following lines into the List component

    const List = ({
      data,
      **nextPage,**
    }: {
      data: Array<Photo>;
      **nextPage: () => void;**
    }): JSX.Element => {
      const renderItem = ({item}: {item: Photo}) => <Item photo={item} />;
      return (
        <FlatList
          style={styles.container}
          data={data}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item: Photo) => item.id.toString()}
          **onEndReached={nextPage}**
        />
      );
    };

We added a new parameter, nextPage, which is a function, to the props of the List component and set this nextPage function to the onEndReached prop of the FlatList component. So this function would be triggered when the user scrolls to the bottom of the list.

And then let us implement this nextPage function in Home.tsx as followed:

    const nextPage = () => {
      const key = 'page';
      if (data?.next_page) {
        const page = decodeURIComponent(
          data.next_page.replace(
            new RegExp(
              '^(?:.*[&\\?]' +
                encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
                '(?:\\=([^&]*))?)?.*$',
              'i',
            ),
            '$1',
          ),
        );
        fetchData('panda', parseInt(page, 10) || 0, 20);
      }
    };

As we see, we extracted the pageIndex from the next_page field in the response JSON, and sent another request for fetching next page of data.

And we also need to modify the Home component and fetchData function as followed:

    const Home = () => {
      const [data, setData] = useState<Data>();
      const [error, setError] = useState<Error>();
      **const requests = new Set();**
      const fetchData = async (
        query: string = 'panda',
        pageIndex: number = 0,
        perPage: number = 20,
      ) => {
    **    const url = `https://api.pexels.com/v1/search?query=${query}&page=${pageIndex}&per_page=${perPage}`;
        try {
          if (requests.has(url)) {
            return;
          }
          requests.add(url);
          console.log(`fetch from: ${url}`);
    **      const response = await fetch(url, {
            ......
          });
          const json = await response.json();
    **      const photos =
            data && data.photos ? data?.photos.concat(json.photos) : json.photos;
          setData({...json, photos});
    **    } catch (error) {
          setError(error);
        **} finally {
          requests.delete(url);
        }
    **  };
    ......
      const list =
        data && !!data.photos && data.photos.length > 0 ? (
          <List data={data.photos} **nextPage={nextPage}** />
        ) : undefined;
      };

We passed the nextPage function to the List component as a prop.

We also concatenated the new photos to the current photo list if there is some photos in current list.

And we also added a set, requests, to remember which requests have been sent to avoid sending duplicated requests.

After updated the code, we can run the App again and scroll down to the bottom of the list, then it would load the next page of photos and add to the list.

![](https://cdn-images-1.medium.com/max/2000/1*6rxGN6PbMc4Mw7-dspaz7Q.gif)

We have build up an image App, which fetches photos from a backend API, and supports pagination so far. But it can fetch panda pictures only because we hardcoded the query keyword. Let’s add a new component, with which the user can input the query keyword.

## Add Search Bar

In this chapter, we will add a search bar, with which the user can input the keyword for querying images. But we are not going to use the SearchBar in the [react native elements](https://reactnativeelements.com/docs/searchbar/) because it would keep been fired every time the user keeps typing. But in our scenario, we need it gets fired only when user clicks search button.

So we would introduce a package called react-native-search-bar by running command as shown:

    yarn add react-native-search-bar

and run

    cd ios/; pod install; cd ..

and rebuild the App again with Xcode because the search bar needs some native dependencies.

And we need to create a new file, Search.tsx in the home folder and implement the Search component as followed:

    import React from 'react';
    import SearchBar from 'react-native-search-bar';

    const Search = ({
      onSearch,
    }: {
        onSearch: (query: string) => void;
    }): JSX.Element => {
      return (
        <SearchBar placeholder={'Type Here...'} onSearchButtonPress={onSearch} />
      );
    };
    export default Search;
    

And the Search component has a props, onSearch, which would be fired when the user types a keyword and starts searching.

And then let us updated the Home component as followed:

    import React, {useState, useEffect} from 'react';
    import {StyleSheet, StatusBar, SafeAreaView, Text} from 'react-native';
    import List from './List';
    import Search from './Search';

    const Home = () => {
      const [data, setData] = useState<Data>();
      const [error, setError] = useState<Error>();
      **const [keyword, setKeyword] = useState<string>();**
      const requests = new Set();
      const fetchData = async (
        **query: string = '',**
        pageIndex: number = 0,
        perPage: number = 20,
      ) => {
        ......

      const nextPage = () => {
        ......
          fetchData(**keyword**, parseInt(page, 10) || 0, 20);
        }
      };

    **  const onSearch = (query: string) => {
        setKeyword(query);
        setData(undefined);
      };
    
      **useEffect(() => {
    **    if (keyword) {
          (async () => await fetchData(keyword, 0, 20))();
        }
      }, [keyword]);
      ......
      const search = <Search onSearch={onSearch} />;**

      return (
    **    <SafeAreaView style={styles.container}>
          {search}
          {list}
          {icon}
        </SafeAreaView>
    **  );
    };
    ......

Don’t forget add import of Search component.

As we see, we add a new hook with useState for the keyword change. And we also added a new function onSearch, which would set the keyword, and clear the current data, the current image list. And we are also using useEffect to monitor the keyword change. We would call fetchData with new keyword once the keyword changes. And we also made some change inside the fetchData function and nextPage function to let them using keyword as query string.

Now let’s run the App, you would see as followed:

![](https://cdn-images-1.medium.com/max/2000/1*xXHKTkgP0RjVl-gaO4cgWg.gif)

So far so good and we have implemented most features of an image browsing App. In next chapter, we would add a detail page to display the detail of a single photo. And we will learn how to implement the navigation with [react-navigation](https://reactnavigation.org/).

## Navigation to detail page
> With react-navigation, we can easily implement the routing and navigation for your React Native apps. ([https://reactnavigation.org/](https://reactnavigation.org/))

In this chapter, we would add another page to display the detail of a single image, and the user could navigate to the detail page by selecting one item from the list on the home page.

At first, we need to add some packages by running following command:

    yarn add [@react](http://twitter.com/react)-navigation/native

    yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context [@react](http://twitter.com/react)-native-community/masked-view

    yarn add [@react](http://twitter.com/react)-navigation/stack

Lots of dependencies as we see.

And we also need to run

    cd ios/; pod install; cd ..

because some iOS pods are necessary.

We would see some messages like

![](https://cdn-images-1.medium.com/max/2000/1*yqliJUWKv6msH2qAb-QPAw.png)

And rebuild the App with Xcode.

And then let us create a new component, Detail.

For sake the tidiness of the project, let’s create a new folder, detail, in the src and create a new source file, Detail.tsx in it, and put following code in this file:

    import React, {useEffect} from 'react';
    import {StyleSheet, StatusBar, Text, Dimensions, Image} from 'react-native';
    import {SafeAreaView} from 'react-native-safe-area-context';
    const deviceWidth = Dimensions.get('window').width;

    const Detail = ({
      navigation,
      route,
    }: {
      navigation: any;
      route: any;
    }): JSX.Element => {
      const {photo}: {photo: Photo} = route.params;
    
      styles.image = {
        ...styles.image,
        height: (styles.image.width * photo.height) / photo.width,
      };

      useEffect(() => navigation.setOptions({title: photo.id}));

      return (
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: photo.src.medium}}
          />
          <Text style={styles.text}>{photo.photographer}</Text>
          <Text style={styles.text}>{photo.photographer_url}</Text>
          <Text style={styles.text}>{`${photo.width} * ${photo.height}`}
          </Text>
        </SafeAreaView>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0 + 0,
        marginHorizontal: 0,
        alignSelf: 'center',
      },
      image: {
        backgroundColor: 'transparent',
        margin: 24,
        width: deviceWidth * 0.8,
        height: 200,
      },
      text: {
        backgroundColor: 'transparent',
        margin: 8,
        width: deviceWidth * 0.8,
      },
    });

    export default Detail;
    

This component is pretty simple, just an Image view and several Text view to display the detail of the image. But there are two issues need to be addressed, one is it has a prop, navigation, because we need to update the title of the detail page with following code

    useEffect(() => navigation.setOptions({title: photo.id}));

as we see, the title of the screen would be updated with navigation.setOptions with parameter title.

Another issue is we changed the height of the Image view dynamically before rendering the image because the height of photos might be different.

And then we need to build the navigation stack. Let’s open App.tsx and add following code

    import 'react-native-gesture-handler';
    import {NavigationContainer} from '@react-navigation/native';
    import {createStackNavigator} from '@react-navigation/stack';
    import Detail from './detail/Detail';

and create a new stack navigator

    const Stack = createStackNavigator();

and wrap the pages in a stack like

    const App = () => {
      return (
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator initialRouteName={'Home'}>
              <Stack.Screen
                name={'Home'}
                component={Home}
                options={{title: 'Overview'}}
              />
              <Stack.Screen name={'Detail'} component={Detail} />
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      );
    };

As we see, we have two screens / pages, Home and Detail in this navigation stack. Let’s implement the navigation between these two screens.

Let’s open Home.tsx and add a parameter, navigation, into the Home component like

    const Home = ({**navigation**}) => {

and pass this navigation instance to the List as followed:

    const list =
      data && !!data.photos && data.photos.length > 0 ? (
        <List data={data.photos} nextPage={nextPage} **navigation={navigation}** />
      ) : undefined;

and then open List.tsx to update the List component as shown:

    const List = ({
      data,
      nextPage,
      **navigation**,
    }: {
      data: Array<Photo>;
      nextPage: () => void;
      **navigation: any;**
    }): JSX.Element => {

As we see, we added a parameter, navigation, to the List component.

And we also need to pass this navigation instance to Item by updating the renderItem function as

    const renderItem = ({item}: {item: Photo}) => (
      <Item photo={item}** navigation={navigation}** />
    );

And let’s update Item component as well. Open the Item.tsx and add parameter, navigation, to the Item component as

    const Item = ({
      photo,
      **navigation,**
    }: {
      photo: Photo;
      **navigation: any;**
    }): JSX.Element => {

and create a navigation function in the Item component like

    const navigate = () => navigation.navigate('Detail', {photo});

It means navigating to Detail screen with a parameter, photo.

and we also need to wrap the Image component with a TouchableOpacity to make it touchable as shown:

    **<TouchableOpacity style={styles.container} onPress={navigate}>**
      <Image
        style={styles.item}
        resizeMode={'cover'}
        source={{uri: photo.src.medium}}
      />
    **</TouchableOpacity>**

Then, the navigate function would be triggered when user clicks this item.

You might need to add necessary dependencies as TouchableOpacity.

Then let’s run the App and try to navigate like:

![](https://cdn-images-1.medium.com/max/2000/1*dwbolESPA4gGLwYeoPWRQQ.gif)

We have completed all essential functions as an image browsing App so far. But you would notice there are still some defects, like it doesn’t support local storage, and it doesn’t use Redux as a central state store. We would improve this app in another tutorial.

Thanks for browsing this tutorial and any comments are welcome.
