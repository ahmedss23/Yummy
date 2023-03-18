let baseURL = "https://www.themealdb.com/api/json/v1/1/";

export async function randomMeals(){
    let res = await fetch(baseURL + "search.php?s=");
    res = await res.json();
    return res.meals;
}

export async function find(id){
    let res = await fetch(baseURL + "lookup.php?i=" + id);
    res = await res.json();
    return res.meals[0];
}


export async function search(query){
    let res = await fetch(baseURL + "search.php?" + query);
    res = await res.json();
    return res.meals ?? [];
}


export async function categories(){
    let res = await fetch(baseURL + "categories.php");
    res = await res.json();
    return res.categories;
}

export async function searchByCategory(cat){
    let res = await fetch(baseURL + "filter.php?c=" + cat);
    res = await res.json();
    return res.meals;
}

export async function areas(){
    let res = await fetch(baseURL + "list.php?a=list");
    res = await res.json();
    return res.meals;
}

export async function searchByArea(area){
    let res = await fetch(baseURL + "filter.php?a=" + area);
    res = await res.json();
    return res.meals;
}

export async function ingredients(){
    let res = await fetch(baseURL + "list.php?i=list");
    res = await res.json();
    return res.meals;
}

export async function searchByIngredient(ingredient){
    let res = await fetch(baseURL + "filter.php?i=" + ingredient);
    res = await res.json();
    return res.meals;
}