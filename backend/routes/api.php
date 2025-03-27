<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ToDoGroupController;
use App\Http\Controllers\ToDoListController;

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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::post('tasks', [ToDoListController::class, 'store'])->middleware('validateToDo');
Route::put('tasks/{id}', [ToDoListController::class, 'update'])->middleware('validate.status.task');
Route::delete('tasks/{id}', [ToDoListController::class, 'destroy']);
Route::apiResource('tasks', ToDoListController::class)->except(['show', 'update', 'destroy', 'store']);

Route::any('{any}',function(){
    return response('', Response::HTTP_NOT_FOUND);
});

