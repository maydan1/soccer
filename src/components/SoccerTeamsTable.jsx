import React, { Component } from 'react'
import styles from './SoccerTeamsTable.module.css'
import { fetchData } from "../api";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


class SoccerTeamsTable extends Component {

   constructor(props) {
      super(props)
      this.state = {
         teams: [],
         favorites: []
      }

      this.toggleFavorite = this.toggleFavorite.bind(this);
      this.isFavorite = this.isFavorite.bind(this);
   }

   async componentDidMount() {
      const fetchedData = await fetchData();
      const savedFavorites = localStorage.getItem("favorites");

      this.setState({
         teams: fetchedData,
         favorites: savedFavorites ? JSON.parse(savedFavorites) : []
      });

   }

   componentDidUpdate() {
      localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
   }

   toggleFavorite = (id) => {
      const currentFavorites = this.state.favorites;
      const currTeamIndex = currentFavorites.indexOf(id);

      currTeamIndex === -1 ? currentFavorites.push(id) : currentFavorites.splice(currTeamIndex, 1);

      localStorage.setItem("favorites", JSON.stringify(currentFavorites));

      this.setState({ favorites: currentFavorites })
   }

   isFavorite = (id) => {
      let index = -1;
      if (this.state.favorites.length) {
         index = this.state.favorites.indexOf(id.toString());
      }
      return index === -1 ? false : true;
   }


   renderTableData() {
      return this.state.teams.map((team, index) => {
         const { id, crest, name, yearFounded } = team
         return (
            <tr key={index}>
               <td>
                  <img className={styles.logo} src={crest} alt="crestUrl" />
               </td>
               <td>{name}</td>
               <td>{yearFounded}</td>
               <td>
                  <Checkbox icon={<FavoriteBorder />}
                     checkedIcon={<Favorite />} name="checkedH"
                     checked={this.isFavorite(id)}
                     onChange={() => this.toggleFavorite(id.toString())} size="large" key={id} />
               </td>
            </tr>
         )
      })
   }

   render() {
      if (this.state.teams.length) {
         return (
            <div>
               <h1>My Soccer Teams</h1>
               <div className={styles.container}>
                  <table>
                     <thead>
                        <tr>
                           <th className={styles.header} key='1'>CREST</th>
                           <th className={styles.header} key='2'>NAME</th>
                           <th className={styles.header} key='3'>YEAR FOUNDED</th>
                           <th className={styles.header} key='0'>FAVORITE</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.renderTableData()}
                     </tbody>
                  </table>
               </div>
            </div>
         )
      }
      else {
         return (
            <h2 >Loading...</h2>)
      }
   }

}

export default SoccerTeamsTable 