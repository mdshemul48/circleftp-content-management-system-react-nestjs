<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\SoftwareController;
use App\Http\Controllers\TutorialsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api', 'namespace' => 'App\Http\Controllers', 'prefix' => 'admin'], function ($router) {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::post('/categoryCreate', [CategoryController::class, 'store']);
    Route::post('/categoryUpdate/{id}', [CategoryController::class, 'update']);
    Route::post('/categoryDelete/{id}', [CategoryController::class, 'destroy']);
    Route::get('/allcategoryInfo', [CategoryController::class, 'getAllCategoryInfo']);

    Route::post('/createMovies', [MoviesController::class, 'store']);
    Route::post('/updateMovies/{id}', [MoviesController::class, 'update']);
    Route::post('/deleteMovies/{id}', [MoviesController::class, 'destroy']);

    Route::post('/createGames', [GamesController::class, 'store']);
    Route::post('/updateGames/{id}', [GamesController::class, 'update']);
    Route::post('/deleteGames/{id}', [GamesController::class, 'destroy']);

    Route::post('/createSoftware', [SoftwareController::class, 'store']);
    Route::post('/updateSoftware/{id}', [SoftwareController::class, 'update']);
    Route::post('/deleteSoftware/{id}', [SoftwareController::class, 'destroy']);

    Route::post('/createTutorials', [TutorialsController::class, 'store']);
    Route::post('/updateTutorials/{id}', [TutorialsController::class, 'update']);
    Route::post('/deleteTutorials/{id}', [TutorialsController::class, 'destroy']);

    Route::get('/getSubCategory/{id}',[CategoryController::class,'getSubCategory']);
});

Route::get('/user', [
    UserController::class, 'getUser'
])->middleware('api');
