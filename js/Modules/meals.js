export function displayMeals(data, element = '#data-container'){
    let meals = data.map(el => new Meal(el));
    let html = "";
    html += '<div class="row mt-4">';
    meals.forEach(el => {
        html += el.card();
    });
    $(element).html(html);
}

export function displayMeal(data){
    let meal = new Meal(data);
    $('#data-container').html(meal.details());
}

class Meal {
    constructor(data){
        this.id = data.idMeal;
        this.name = data.strMeal;
        this.instructions = data.strInstructions;
        this.area = data.strArea;
        this.category = data.strCategory;
        this.thumbnail = data.strMealThumb;
        this.tags = data.strTags ?  data.strTags.split(',').map(el=>el.trim()) : [];
        this.source = data.strSource;
        this.youtube = data.strYoutube;
        let ingredients = [];

        for(let x in data){
            if(x.startsWith('strIngredient') && data[x]){
                ingredients.push(data[x.replace('strIngredient', 'strMeasure')] + " " + data[x])
            };
        };

        this.ingredients = ingredients;
    }

    card(){
        return `<div class="col-md-3 mb-4 meal-card" data-id=${this.id}>
                    <div class="w-100 h-100 rounded-2 position-relative overflow-hidden has-overlay">
                        <img src="${this.thumbnail}" alt="" class="w-100 rounded-2">
                        <div class="overlay w-100 h-100 position-absolute bg-white bg-opacity-75 top-100 d-flex align-items-center p-2">
                            <h3 class="text-black">${this.name}</h3>
                        </div>
                    </div>
                </div>`;
    }

    details(){
        let ingredientsList = "";
        let tagsList = ""
        this.ingredients.forEach(el=>{
            ingredientsList += `<li class="alert alert-info m-2 p-1">${el}</li>`
        })
        if(this.tags.length){
            tagsList += `<h3>Tags :</h3>
                            <ul class="list-unstyled d-flex flex-wrap g-3">`;
            this.tags.forEach(el=>{
                tagsList += `<li class="alert alert-danger m-2 p-1">${el}</li>`
            })
            tagsList += "</ul>"
        }
        return `<div class="w-100 vh-100">
                    <div class="row mt-4">
                        <div class="col-md-4">
                            <img src="${this.thumbnail}" alt="${this.name} Meal Image" class="w-100 rounded-2">
                            <h2 class="text-white">${this.name}</h2>
                        </div>
                        <div class="col-md-8 text-white">
                            <h2>Instructions</h2>
                            <p>${this.instructions}</p>
                                <h3><span class="fw-bolder">Area : </span>${this.area}</h3>
                                <h3><span class="fw-bolder">Category : </span>${this.category}</h3>
                                <h3>Recipes : </h3>
                                <ul class="list-unstyled d-flex flex-wrap g-3">
                                ${ingredientsList}
                                </ul>
                                ${tagsList}
                                <a href="${this.source}" class="btn btn-success">Source</a>
                                <a href="${this.youtube}" class="btn btn-danger">Youtube</a>
                        </div>
                    </div>
                </div>`;
    }
}