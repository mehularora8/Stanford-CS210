import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
          <Block>
            {/* Insert map here and remove placeholder */}
            <Text style={styles.mapTemp}>This is a placeholder for the map.</Text> 
          </Block>
        <Block flex>
          <Text style={styles.headerText}>Resources Near You</Text>

          <Card item={articles[0]} horizontal  />
          {/* <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block> */}
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} horizontal />
          {/* <Card item={articles[4]} full /> */}
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  mapTemp: {
    paddingVertical: theme.SIZES.BASE * 8,
    backgroundColor: "#999999",
    textAlign: "center",
    marginBottom: "3%"
  }, 
  headerText: {
    fontSize: 17,
  }
});

export default Home;
