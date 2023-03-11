import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    search: '',
    page: 1,
    photos: [],
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      ImageService.getImages(search, page).then(({photos, total_results})=> {
        this.setState((prevState)=>({photos: [...prevState.photos, ...photos], showBtn: page < Math.ceil(total_results/15)}))
      });
    }
  }

  onSubmit = search => {
    console.log(search);
    this.setState({ search });
  };

  onClickBtn = ()=>{
    this.setState((prevState)=> ({page: prevState.page + 1}));
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {
            this.state.photos.map(photo => (
              <GridItem key={photo.id}>
                <CardItem color={photo.avg_color}>
                  <img src={photo.src.large} alt={photo.alt} />
                </CardItem>
              </GridItem>
            ))
          }
        </Grid>

        {this.state.showBtn && <Button onClick={this.onClickBtn}>Load more</Button>}
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
