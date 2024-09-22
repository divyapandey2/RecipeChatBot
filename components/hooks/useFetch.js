import { StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React,{useEffect,useState} from 'react'


export default function useFetch({query}) {
  const [food,setFood]=useState("")
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipe=async()=>{
    try{
        const response= await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=72aa38298bd743debc60064344b3045a`);
        const data=await response.json();
        setFood(data.results);
    }
    catch (error) {
        console.error('Error fetching recipe:', error);
    } finally {
        setIsLoading(false);
      }
  };

    useEffect(()=>{
        fetchRecipe();
     },[query]);

     return {
    food,isLoading
  };
}

const styles = StyleSheet.create({})