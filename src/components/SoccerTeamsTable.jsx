import React, { Component } from 'react'
import styles from './SoccerTeamsTable.module.css'
import { fetchData } from "../api";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const FAVORITES = "favorites";
class SoccerTeamsTable extends Component {

   constructor(props) {
      super(props)
      this.state = {
         teams: [],
         favorites: []
      }
   }

   async componentDidMount() {
      try {
         const fetchedData = await fetchData();
         const savedFavorites = localStorage.getItem(FAVORITES);

         this.setState({
            teams: fetchedData,
            favorites: savedFavorites
               ? JSON.parse(savedFavorites)
               : []
         });

      } catch (error) {
         console.log(error);
      }
   }

   componentDidUpdate() {
      localStorage.setItem(FAVORITES, JSON.stringify(this.state.favorites));
   }

   toggleFavorite = (id) => {
      const currentFavorites = this.state.favorites;
      const currTeamIndex = currentFavorites.indexOf(id);

      currTeamIndex === -1
         ? currentFavorites.push(id)
         : currentFavorites.splice(currTeamIndex, 1);

      localStorage.setItem(FAVORITES, JSON.stringify(currentFavorites));

      this.setState({ favorites: currentFavorites })
   }

   isFavorite = (id) => {

      if (this.state.favorites.length) {
         return this
            .state
            .favorites
            .includes(id.toString());
      }
      return false;
   }

   renderTableData() {
      return this
         .state
         .teams
         .map((team, index) => {
            const { id, crest, name, yearFounded } = team
            return (
               <tr key={index}>
                  <td>
                     <img className={styles.logo} src={crest} alt="crestUrl" />
                  </td>
                  <td>{name}</td>
                  <td>{yearFounded}</td>
                  <td>
                     <Checkbox
                        icon={< FavoriteBorder />}
                        checkedIcon={< Favorite />}
                        name="checkedH"
                        checked={this.isFavorite(id)}
                        onChange={() => this.toggleFavorite(id.toString())}
                        key={id} />
                  </td>
               </tr>
            )
         })
   }

   render() {
      if (this.state.teams.length) {
         return (
            <div className={styles.container}>
               <table>
                  <thead>
                     <tr>
                        <th className={styles.header} key='0'>CREST</th>
                        <th className={styles.header} key='1'>NAME</th>
                        <th className={styles.header} key='2'>YEAR FOUNDED</th>
                        <th className={styles.header} key='3'>FAVORITE</th>
                     </tr>
                  </thead>
                  <tbody>
                     {this.renderTableData()}
                  </tbody>
               </table>
            </div>
         )
      } else {
         return (
            <h2>Loading...</h2>
         )
      }
   }

}

export default SoccerTeamsTable