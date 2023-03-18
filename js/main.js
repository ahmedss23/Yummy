import * as API from './Modules/api.js';
import * as Meals from './Modules/meals.js';

function toggleNavbar(){
    let condition = $('nav').css('left') == '0px'; 
    $('#nav-links ul').animate({
        'top' : condition ? '100%' : '0%'
    }, 700);
    document.querySelector('nav div div').style.overflow = condition ? 'hidden' : 'visible';

    $('nav').animate({
        'left' : condition ? -$('#nav-links').outerWidth() : '0px'
    })
    $('#toggle-nav-btn i').removeClass(condition ? 'fa-close' : 'fa-bars').addClass(condition ? 'fa-bars' : 'fa-close');
}

$('#toggle-nav-btn').click(toggleNavbar);
toggleNavbar();

(async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.randomMeals();
    Meals.displayMeals(data);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})();


// Meal Details
$(document).on('click', '.meal-card', async function(){
    let meal = await API.find($(this).data('id'));
    Meals.displayMeal(meal);
})


// Search
$('#search-link').click(function(){
    $('#data-container').html(`<div class="row pb-5">
                                    <div class="col-md-6"><input type="text" data-q="s=" id="meal_name" class="form-control bg-transparent text-white search-input" placeholder="Search By Name"></div>
                                    <div class="col-md-6"><input type="text" data-q="f=" id="meal_first_letter" class="form-control bg-transparent text-white search-input" placeholder="Search By First Letter"></div>
                                </div>
                                <div id="search-results"></div>`);
});

$(document).on('input', '.search-input', async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.search($(this).data('q') + $(this).val());
    Meals.displayMeals(data, '#search-results');
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})

// Categories
$('#categories-link').click(async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.categories();
    let html = "";
    html += '<div class="row mt-4">';
    data.forEach(el => {
        html += `<div class="col-md-3 mb-4 category-card" data-cat="${el.strCategory}">
                    <div class="w-100 h-100 rounded-2 position-relative overflow-hidden has-overlay">
                        <img src="${el.strCategoryThumb}" alt="" class="w-100 rounded-2">
                        <div class="overlay w-100 h-100 position-absolute bg-white bg-opacity-75 top-100 p-2 text-center">
                            <h3 class="text-black">${el.strCategory}</h3>
                            <p class="text-black">${el.strCategoryDescription}</p>
                        </div>
                    </div>
                </div>`;
    });
    html += '</div>';
    $('#data-container').html(html);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})

$(document).on('click', '.category-card', async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.searchByCategory($(this).data('cat'));
    Meals.displayMeals(data);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})

// Areas
$('#area-link').click(async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.areas();
    let html = "";
    html += '<div class="row mt-4">';
    data.forEach(el => {
        html += `<div class="col-md-3 text-center mb-4 text-white area-card" data-area="${el.strArea}">
                    <div class="w-100 h-100">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${el.strArea}</h3>
                    </div>
                </div>`;
    });
    html += '</div>';
    $('#data-container').html(html);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})


$(document).on('click', '.area-card', async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.searchByArea($(this).data('area'));
    Meals.displayMeals(data);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})


// Ingredients
$('#ingredients-link').click(async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.ingredients();
    let html = "";
    html += '<div class="row mt-4">';
    data.forEach(el => {
        html += `<div class="col-md-3 text-center text-white ingredient-card" data-ingredient="${el.strIngredient}">
                    <div class="w-100 h-100">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3>${el.strIngredient}</h3>
                            <p>The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of</p>
                    </div>
                </div>`;
    });
    html += '</div>';
    $('#data-container').html(html);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})


$(document).on('click', '.ingredient-card', async function(){
    $('#loading-screen').removeClass('d-none').addClass('d-flex');
    let data = await API.searchByIngredient($(this).data('ingredient'));
    Meals.displayMeals(data);
    $('#loading-screen').removeClass('d-flex').addClass('d-none');
})


// Contact
$('#contact-link').click(function(){
    $('#data-container').html(`<div class="w-100 vh-100 d-flex justify-content-center align-items-center">
                                    <div class="row col-md-9">
                                        <div class="col-md-6 mb-4">
                                            <input type="text" id="name" class="form-control mb-2" placeholder="Enter Your Name">
                                            <div class="alert alert-danger d-none">Special characters and numbers not allowed</div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <input type="text" id="email" class="form-control mb-2" placeholder="Enter Your Email">
                                            <div class="alert alert-danger d-none">Email not valid *exemple@yyy.zzz</div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <input type="text" id="phone" class="form-control mb-2" placeholder="Enter Your phone">
                                            <div class="alert alert-danger d-none">Enter valid Phone Number</div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <input type="text" id="age" class="form-control mb-2" placeholder="Enter Your Age">
                                            <div class="alert alert-danger d-none">Enter valid age</div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <input type="password" id="password" class="form-control mb-2" placeholder="Enter Your Password">
                                            <div class="alert alert-danger d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                                        </div>
                                        <div class="col-md-6 mb-4">
                                            <input type="password" id="password_confirmation" class="form-control mb-2" placeholder="Enter Your Password Confirmation">
                                            <div class="alert alert-danger d-none">Enter valid repassword</div>
                                        </div>
                                        <div class="col text-center">
                                            <button disabled id="submit" class="btn btn-outline-danger">Submit</button>
                                        </div>
                                    </div>
                                </div>`);
})

$(document).on('input', '#name', function(){
    let condition = /^[a-zA-z]*$/.test($(this).val());
    $(this).next().removeClass(condition ? 'd-block' : 'd-none').addClass(condition ? 'd-none' : 'd-block')
    formValidation();
})

$(document).on('input', '#email', function(){
    let condition = /^[a-zA-z]*@[a-zA-z]{3,}\.[a-zA-z]{3,}$/.test($(this).val());
    $(this).next().removeClass(condition ? 'd-block' : 'd-none').addClass(condition ? 'd-none' : 'd-block');
    formValidation();
})
$(document).on('input', '#phone', function(){
    let condition = /^[0-9]{11,12}$/.test($(this).val());
    $(this).next().removeClass(condition ? 'd-block' : 'd-none').addClass(condition ? 'd-none' : 'd-block');
    formValidation();
})
$(document).on('input', '#age', function(){
    let condition = ($(this).val() < 100);
    $(this).next().removeClass(condition ? 'd-block' : 'd-none').addClass(condition ? 'd-none' : 'd-block');
    formValidation();
})
$(document).on('input', '#password', function(){
    let condition1 = $(this).val().length >= 8;
    let condition2 = $(this).val().match(/[a-zA-Z]/);
    let condition3 = $(this).val().match(/\d/);
    $(this).next().removeClass((condition1 && condition2 && condition3) ? 'd-block' : 'd-none').addClass((condition1 && condition2 && condition3) ? 'd-none' : 'd-block');

    formValidation();
})
$(document).on('input', '#password_confirmation', function(){
    let condition = $(this).val() == $('#password').val();
    $(this).next().removeClass(condition ? 'd-block' : 'd-none').addClass(condition ? 'd-none' : 'd-block');
    formValidation();
})

function formValidation(){
    let nameInput = $('#name');
    let emailInput = $('#email');
    let phoneInput = $('#phone');
    let ageInput = $('#age');
    let passwordInput = $('#password');
    let passwordConfirmationInput = $('#password_confirmation');

    let nameCondition = /^[a-zA-z]*$/.test(nameInput.val());
    let emailCondition = /^[a-zA-z]*@[a-zA-z]{3,}\.[a-zA-z]{3,}$/.test(emailInput.val());
    let phoneCondition = /^[0-9]{11,12}$/.test(phoneInput.val());
    let ageCondition = (ageInput.val() < 100);
    let passwordCondition1 = passwordInput.val().length >= 8;
    let passwordCondition2 = passwordInput.val().match(/[a-zA-Z]/);
    let passwordCondition3 = passwordInput.val().match(/\d/);
    let passwordConfirmationCondition = passwordConfirmationInput.val() == $('#password').val()
    console.log(nameCondition , emailCondition , phoneCondition , ageCondition , passwordCondition1 , passwordCondition2 , passwordCondition3 , passwordConfirmationCondition);
    if(nameCondition && emailCondition && phoneCondition && ageCondition && passwordCondition1 && passwordCondition2 && passwordCondition3 && passwordConfirmationCondition){
        $('#submit').removeAttr('disabled');
    } else {
        $('#submit').attr('disabled','disabled');
    }
}