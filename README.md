# henri-potier-react-native

## Overview

Dans ce tutoriel, nous allons construire une version simple de l'application IOS/Android de la bibliothèque d'Henri Potier.

## Setup

> Cet exemple d'application nécessite l'installation de base expliquée à
> [React Native Getting Started](https://facebook.github.io/react-native/releases/next/docs/getting-started.html).

Résumé des actions à effectuer:

1. `npm install -g create-react-native-app`

2. `create-react-native-app HenriPotierBookshop`

3. `installer l'application Expo sur votre smartphone IOS/Android`

### Starting the app IOS/Android

    cd HenriPotierBookshop && npm start

Connectez votre smartphone au même réseau que votre ordinateur. Utilisez l'application Expo pour scanner le QR code depuis votre terminal et selectionnez votre projet.

### Hello World

create-react-native-app a généré une structure d'application avec le nom de votre projet, dans notre cas HenriPotierBookshop.
Ouvrez le fichier App.js pour commencer à travailler sur votre application, les changements que vous effectuez vont automatiquement relancer et mettre à jour l'application sur votre téléphone.
Secouez votre smartphone pour afficher la console de dévellopement. 

## Actual App
 
Maintenant que nous avons initialisé notre projet React Native, commençons le dévelopement de notre application HenriPotierBookshop.

![Alt text](/img/Exercice.png?raw=true "Screenshot book with shadow")

### Mocking data

Avant d'écrire le code pour récupérer les données réelles sur les livres d'Henri Potier, nous "moquerons" certaines données afin de prendre rapidement en main React Native.
Ajoutez la constante suivante dans votre fichier App.js.

```javascript
const MOCKED_BOOKS_DATA = [
  {title: 'Henri Potier à l\'école des sorciers', price: '35', cover: 'http://henri-potier.xebia.fr/hp0.jpg'},
];
```

### Render a book

Nous allons afficher le titre, le prix et la vignette d'un livre. La vignette étant un composant Image dans React Native, ajoutez Image à la liste des importations React Native ci-dessous.

```javascript
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
```

Modifiez maintenant la fonction 'render' pour afficher les données mentionnées précédemment plutôt que le 'Hello World'.

```javascript
render() {
  const book = MOCKED_BOOKS_DATA[0];
  return (
    <View style={styles.container}>
      <Image source={{uri: book.cover}}/>
      <Text>{book.title}</Text>
      <Text>{book.price}</Text>
    </View>
  );
}
```

Appuyez sur `⌘ + R` /` Recharger JS` et vous devriez voir affiché "Henri Potier à l'école des sorciers" et "35". Notez que l'image ne s'affiche pas. C'est parce que nous n'avons pas spécifié la largeur et la hauteur de l'image. Cela se fait via des styles. Modifions nos styles avec les valeurs suivantes:

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 150,
    height: 200,
  },
});
```

Et enfin, nous devons appliquer ce style au composant Image:

```javascript
<Image
  source={{uri: book.cover}}
  style={styles.thumbnail}
/>
```

Appuyez sur `⌘ + R` /` Recharger JS` et l'image devrait s'afficher maintenant.

<img src="/img/BookWithoutStyle.png" width="300">

### Add some styling

C'est génial,les données s'affichent!! Maintenant, ajoutons-y un peu de style:

![Alt text](/img/Book-Specs.png?raw=true "Book Design")

Maintenant nous allons ajouter un autre conteneur (composant `View`) afin de définir la dimension et l'arrière plan de la représentation du livre.
Utilisez les propriétés de style `width` et `backgroundColor`.

```javascript
return (
  <View style={styles.container}>
    <View style={styles.bookContainer}>
      <Image
        style={styles.thumbnail}
        source={{ uri: book.cover }}/>
      <Text>{book.title}</Text>
      <Text>{book.price}</Text>
    </View>
  </View>
);
```

Astuce: Supprimez la propriété `width` de l'image pour qu'elle occupe tout l'espace disponible de son parent.

```javascript
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e8e8e8',
},
bookContainer: {
  width: 150,
  backgroundColor: '#FFF'
},
thumbnail: {
  height: 200,
},
```

Ajoutez un conteneur autour des textes pour y appliquer du style. 

```javascript
return (
  <View style={styles.container}>
    <View style={styles.bookContainer}>
      <Image
        style={styles.thumbnail}
        source={{ uri: book.cover }}/>
      <View style={styles.descriptionContainer}>
        <Text>{book.title}</Text>
        <Text>{book.price}</Text>
      </View>
    </View>
  </View>
);
```

```javascript
descriptionContainer: {
  padding: 8
},
```

Changez la couleur du prix et alignez le texte à droite.

Nous utilisons FlexBox pour la mise en page - voir [FlexBox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) pour en savoir plus.

```javascript
return (
 <View style={styles.container}>
   <View style={styles.bookContainer}>
     <Image
       style={styles.thumbnail}
       source={{ uri: book.cover }}/>
     <View style={styles.descriptionContainer}>
       <Text>{book.title}</Text>
       <Text style={styles.price}>{book.price}&nbsp;€</Text>
     </View>
   </View>
 </View>
);
```

```javascript
price: {
  paddingTop: 8,
  color: '#03a9f4',
  alignSelf: 'flex-end',
},
```

Dernière étape, ajoutez une ombre !

Pour appliquer une ombre à notre composant "book", nous allons utiliser : 

* les propriétes de style `Shadow` pour la plateforme IOS.

```javascript
shadowOpacity: 0.1,
shadowOffset: {
  height: 1,
},
shadowColor: 'black',
shadowRadius: 1,
```

* Et la propriété de style `elevation` pour la plateforme Android.

```javascript
elevation: 2 //Material Design Card Elevation -> 2 
```
Pour appliquer des propriétés de style en fonction de l'OS, nous allons utiliser l'api `Platform` de React Native.

[platform-specific-code](https://facebook.github.io/react-native/docs/platform-specific-code.html) pour en savoir plus.

```javascript
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
```

```javascript
bookContainer: {
    width: 150,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
        shadowOffset: {
          height: 1,
        },
        shadowColor: 'black',
        shadowRadius: 1,
      },
      android: {
        elevation: 2
      }
    })
},
```

Appuyez sur `⌘ + R` /` Recharger JS` pour observer la mise à jour.

<img src="/img/BookWithStyle.png" width="300">

### Fetching real data

Ajoutez la constante suivante en dessous des importations pour définir la `REQUEST_URL` utilisée pour obtenir les données de la bibliothèque Henri Potier.

```javascript

const REQUEST_URL = 'http://henri-potier.xebia.fr/books';
```


Ajoutez un état initial à notre application afin que nous puissions vérifier `this.state.books === null` dans la méthode `render` pour déterminer si les données de la bibliothèque ont été chargées ou non. Nous pourrons redéfinir ces données avec la réponse de l'api grâce  `this.setState ({books: booksData})`. Ajoutez ce code juste au-dessus de la fonction de rendu dans notre classe React.

```javascript
constructor(props) {
  super(props);
  this.state = {
    books: null,
  };
}
```

Nous souhaitons requeter l'api juste après la fin du chargement du composant. `ComponentDidMount` est une fonction de `React Component` que React appellera exactement une fois, juste après le chargement du composant.

```javascript
componentDidMount() {
  this.fetchData();
}
```

Ajoutez maintenant la fonction `fetchData` ci-dessus à notre composant principal. Cette méthode sera responsable de la gestion de l'extraction des données. Tout ce que vous devez faire est d'appeler `this.setState ({books: data})` après avoir résolu la chaîne de promesses. 
Selon les principes de React, la fonction `setState` va mettre à jour l'état du composant et déclenche un re-render, puis la fonction `render` notera que` this.state.books` n'est plus «nul».

```javascript
fetchData() {
  fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        books: responseData.books,
      });
    })
}
```

Modifiez maintenant la fonction `render` pour afficher le premier livre de la bibliothèque ou une vue de chargement s'il n'y a aucune donnée (Afficher: 'Chargement des livres...').

```javascript
render() {
  if (!this.state.books) {
    return this.renderLoadingView();
  }
  const book = this.state.books[0];
  return this.renderBook(book);
}

renderLoadingView() {
  return (
    <View style={styles.container}>
      <Text>
        Chargement des livres...
      </Text>
    </View>
  );
}

renderBook(book) {
  return (
     <View style={styles.bookContainer}>
       <Image
         style={styles.thumbnail}
         source={{ uri: book.cover }}/>
       <View style={styles.descriptionContainer}>
         <Text>{book.title}</Text>
         <Text style={styles.price}>{book.price}&nbsp;€</Text>
       </View>
     </View>
  );
}
```

Maintenant, appuyez sur `⌘ + R` /` Reload JS` et vous devriez voir "Chargement des livres ..." jusqu'à ce que l'on recoivent des données de l'API, puis il rendra le premier film qu'il a tiré de la bibliothèque d'Henri Potier.

## FlatList

Modifions maintenant cette application pour afficher toutes ces données dans un composant [FlatList](http://facebook.github.io/react-native/docs/flatlist.html), plutôt que d'afficher uniquement le premier livre.

Pourquoi utiliser «FlatList» est-il mieux que d'afficher tout simplement ces éléments via une boucle et de les mettre dans une [ScrollView](http://facebook.github.io/react-native/releases/0.45/docs/scrollview.html) ? 
Malgré le fait d'être rapide, l'affichage d'une liste éventuellement infinie d'éléments pourrait être lent. `FlatList` planifie l'affichage des éléments de la liste afin de gérer uniquement ceux qui sont visibles sur l'écran. Ceux déjà affichés mais hors écran sont supprimés de la hiérarchie de vue native.

Tout d'abord: ajoutez l'importation `FlatList` en haut du fichier.

```javascript
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
```

Modifiez maintenant la fonction `render` pour qu'une liste de livres s'affiche une fois que nous avons nos données.

```javascript
constructor(props) {
  super(props);
  this.state = {
    books: null,
    loaded: false,
  };
}

fetchData() {
  fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        books: responseData,
        loaded: true,
      });
    })
}

render() {
  if (!this.state.loaded) {
    return this.renderLoadingView();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={this.state.books}
        keyExtractor={(book) => book.isbn}
        renderItem={this.renderBook}
      />
    </View>
  );
}
```
Ooops les données de l'api ne s'affichent plus...

<img src="/img/EmptyBooks.png" width="300">

Debuggez l'application, observez le format du paramètre passé à la callback `renderItem` et modifiez la fonction `renderBook`.

Secouez votre smartphone, appuyez sur `⌘ + R` (émulateur IOS) ou `⌘ + M` (émulateur Android) pour faire apparaitre le menu de développement.  

<img src="/img/Debugger.png" width="300">

```javascript
renderBook({item}) {
  return (
    <View style={styles.bookContainer}>
      <Image
        style={styles.thumbnail}
        source={{ uri: item.cover }}/>
      <View style={styles.descriptionContainer}>
        <Text>{item.title}</Text>
        <Text style={styles.price}>{item.price}&nbsp;€</Text>
      </View>
    </View>
  );
}
```

Enfin, ajoutons les propriétés `numColumns` et `showsVerticalScrollIndicator` pour se conformer au design :

```javascript
<View style={styles.container}>
  <FlatList
    numColumns={2}
    showsVerticalScrollIndicator={false}
    data={this.state.books}
    keyExtractor={(book) => book.isbn}
    renderItem={this.renderBook}
  />
</View>
```

Et voici le résultat final:

<img src="/img/Final.png" width="300">

Il reste encore du travail à faire pour en faire une application entièrement fonctionnelle telle que: l'ajout de navigation, la recherche, le chargement de défilement infini, etc. Visitez l'[exemple d'application de React Native](https://github.com/facebook/react-native/tree / Master / Exemples / Films) pour observer l'implémentation de plus de fonctionnalités.

### Final source code

```javascript
import React from 'react';
import { StyleSheet, Text, View, Image, Platform, FlatList } from 'react-native';

const REQUEST_URL = 'http://henri-potier.xebia.fr/books';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          books: responseData,
          loaded: true,
        });
      })
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.books}
          keyExtractor={(book) => book.isbn}
          renderItem={this.renderBook}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderBook({item}) {
    return (
      <View style={styles.bookContainer}>
        <Image
          style={styles.thumbnail}
          source={{ uri: item.cover }}/>
        <View style={styles.descriptionContainer}>
          <Text>{item.title}</Text>
          <Text style={styles.price}>{item.price}&nbsp;€</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
  },
  bookContainer: {
    width: 150,
    margin: 8,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
        shadowOffset: {
          height: 1,
        },
        shadowColor: 'black',
        shadowRadius: 1,
      },
      android: {
        elevation: 2
      }
    })
  },
  descriptionContainer: {
    padding: 8
  },
  price: {
    paddingTop: 8,
    color: '#03a9f4',
    alignSelf: 'flex-end'
  },
  thumbnail: {
    height: 200,
  },
});
```
