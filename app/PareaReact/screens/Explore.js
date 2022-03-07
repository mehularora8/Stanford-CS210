import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';


import { Button, Card, Input } from '../components';

import articles from '../constants/articles';
import AddResource from './AddResource';
import { height } from 'dom-helpers';
import { withNavigation } from '@react-navigation/compat';

var Map = require('../components/Map').default

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    const navigation = this.props.navigation
    console.log(this.props)
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Block flex style={styles.topBlock} />
        <Map />
        <Input placeholder="Search for activities, care providers, restaurants" 
              style={styles.input}/>
          <Button onPress={()=> navigation.navigate('AddResource')}>
            Add Resource
          </Button>
        <Block flex style={styles.articles}>
          <Block flex style={styles.resourcesText}>
            <Text style={styles.headerText}>Resources Near You</Text>
            <Text style={styles.resultsHeader}> {articles.length} results</Text>
          </Block>

          {
            articles.map((x, i) => (
              <Card item={{...x, key: i}} key={"result"+i} horizontal />
            ))
          }
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <>
        <Block flex center style={styles.home}>
          {this.renderArticles()}
        </Block>
      </>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    marginVertical: 0,
  },
  scrollView : {
    marginVertical: 0,
  },
  articles: {
    width: width - 20,
    alignSelf: 'center',
    paddingVertical: theme.SIZES.BASE - 20,
    borderRadius: 9,
  },
  headerText: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 10,
    fontWeight: 'bold',
    borderRadius: 9,
  },
  input: {
    // backgroundColor: "#FC3901",
    marginVertical: -450,
    width: width - 40,
    alignSelf: 'center',
    // opacity: 0.70,
  },
  topBlock: {
    backgroundColor: "#FC3901",
    marginVertical: 30,
    opacity: 0.7,
  },
  resourcesText: {
    // fontWeight: 'bold',
    flexDirection: 'row',
  },
  resultsHeader: {
    textAlign: "right",
    paddingLeft: 135,
    paddingVertical: 5,
    fontWeight: '200',
    fontSize: 12,
    paddingBottom: -5,
  }
});

export default Home;
