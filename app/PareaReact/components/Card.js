import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Rating } from 'react-native-ratings';
import { argonTheme } from '../constants';


class Card extends React.Component {
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle, num } = this.props;
    
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    console.log(item.data.Tags)
    return (

      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ResourceFull', {nav: navigation, resourceId: item.data.resourceId, name: item.data.Name, tags: item.data.Tags, type: item.data.Type, image: item.data.Images.url})}> 
          <Block flex space="between" style={styles.cardDescription}>
            <Block row={horizontal}>
              <Text size={14}>{item.key+1}. </Text>
            <Text size={14} style={styles.cardTitle}>{item.data.Name}</Text>
            </Block>
            <Block row={horizontal}>
              <Rating 
                  type="custom"
                  ratingColor="#fc3901"
                  ratingBackgroundColor="#999999"
                  fractions={1}
                  startingValue={item.data.Ratings.Overall}
                  imageSize={15}
                  readonly  
                  style={{alignSelf: 'flex-start', marginLeft: 4}}
                  />
                  <Text style={{marginLeft: 3, marginRight: 3}}>
                    {item.data.Ratings.Overall}
                  </Text>
                  <Text style={{color: 'grey'}}>
                    [{item.data.Ratings.reviewCount}]
                  </Text>
              </Block>

            <Block row={horizontal}>
            {
            item.data.Tags.map((x) => (
              <Text size={10} key={x} style={styles.labels}>
                {x}
              </Text>
            ))}
            </Block>
            {/* <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.PRIMARY} bold>{item.cta}</Text> */}
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ResourceFull', {resourceId: item.data.resourceId, name: item.data.Name, tags: item.data.Tags, type: item.data.type, image: item.data.image})}>
          <Block  style={imgContainer}>
            <Image source={{url: item.data.Images.url}} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
      </Block>        
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 1,
    minHeight: 114,
    marginBottom: 3,
    padding: "2%"
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    fontWeight: 'bold',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  labels: {
    backgroundColor: "rgba(196, 196, 196, 0.3)",
    borderRadius: 12,
    margin: 3,
    padding: 5,
    overflow: 'hidden',
    opacity: 0.6,
  },
  imageContainer: {
    borderRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    width: 100,
    height: 100,

  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default Card;  // withNavigation(