import React, { Component } from 'react'
import styles from './SoccerTeamsTable.module.css' 
import {fetchData} from "../api";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


class SoccerTeamsTable extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         teams : [],
         favorites : []
      }

      this.toggleFavorite = this.toggleFavorite.bind(this);
      this.isFavorite = this.isFavorite.bind(this);
   }

   async componentDidMount() {
      const fetchedData = await fetchData();
      const savedFavorites = localStorage.getItem("favorites");

      this.setState({ teams: fetchedData,
                        favorites : savedFavorites ? JSON.parse(savedFavorites) : [] });

      console.log(this.state.favorites);
    }

    componentDidUpdate()
    {
       localStorage.setItem('favorites',JSON.stringify(this.state.favorites));
    }

   toggleFavorite = (id) =>
   {
      const currentFavorites = this.state.favorites;
      const currTeamIndex = currentFavorites.indexOf(id);

      console.log(currTeamIndex);
   
      currTeamIndex === -1 ? currentFavorites.push(id) : currentFavorites.splice(currTeamIndex,1);
   
      localStorage.setItem("favorites",JSON.stringify(currentFavorites));
   
      this.setState({favorites : currentFavorites})
   
      console.log("new fav: " + this.state.favorites)
   }

   isFavorite = (id) =>
   { 
      let index = -1;
      if(this.state.favorites.length){
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
             <Checkbox icon={<FavoriteBorder />} 
             checkedIcon={<Favorite />} name="checkedH" 
             checked={this.isFavorite(id)} 
             onChange={()=>this.toggleFavorite(id.toString())} size="medium" key={id} />
            </td>
             <td>
             <img className={styles.logo} src={crest} alt="crestUrl"/></td>
             <td>{name}</td>
             <td>{yearFounded}</td>
          </tr>
       )
    })
 }

 render() {
    if(this.state.teams.length)
    {
   //  const header = Object.keys(this.state.teams[0]);
    return (
       <div>
          <h1 className={styles.title}>Soccer Teams</h1>
          <table className={styles.teams}>
          <thead>
            <tr>
               {/* {header.map((h,key) => 
               <th key={key}>{h}</th>)} */}
               <th key='0'>FAVORITE</th>
               <th key='1'>CREST</th>
               <th key='2'>NAME</th>
               <th key='3'>YEAR FOUNDED</th>
            </tr>
          </thead>
             <tbody>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
 else {
    return(
<h1>Loading..</h1>
    )
}
}

}

export default SoccerTeamsTable 