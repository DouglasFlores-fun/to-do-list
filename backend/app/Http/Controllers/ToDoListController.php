<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ToDoList;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Response;

class ToDoListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ToDoList::query();

        //Filter by status
        if ($request->has('completed')) {
            $completed = filter_var($request->completed, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if (!is_null($completed)) {
                $query->where('completed', $completed);
            }
        }

        //Sort query
        if ($request->has('sort_by') && in_array($request->sort_by, ['completed', 'due_date'])) {
            $sortDirection = $request->get('sort_direction', 'asc');
            if(in_array($sortDirection, ['asc','desc']))
                $query->orderBy($request->sort_by, $sortDirection);
        }
        return response()->json($query->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $task = ToDoList::create([
            'title' => $request->title,
            'description' => $request->description,
            'due_date'=> $request->due_date,
            'completed' => false,
        ]);

        if(!$task){
            return response()->json(["message"=>"Can't create task"], Response::HTTP_EXPECTATION_FAILED);
        }

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $toDoList = ToDoList::find($id);
        if(!$toDoList){
            return response()->json(['message'=> "Task not exist"], Response::HTTP_NOT_FOUND);
        }

        return response()->json($toDoList, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

     /**
      *
      */
    public function update(Request $request, int $id)
    {
        if($request)

        $toDoList = ToDoList::find($id);
        if(!$toDoList){
            return response()->json(['message'=> "Task not exist"], Response::HTTP_NOT_FOUND);
        }

        if ($request->has('title')) {
            $toDoList->title = $request->title;
        }

        if ($request->has('description')) {
            $toDoList->description = $request->description;
        }

        if ($request->has('completed')) {
            $toDoList->completed = $request->completed;
        }

        if ($request->has('due_date')) {
            $toDoList->due_date = $request->due_date;
        }

        $result = $toDoList->save();

        if(!$result){
            return response()->json(['message'=> "Can't update task"], Response::HTTP_BAD_REQUEST);
        }
        return response()->json($toDoList);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $toDoList = ToDoList::find($id);
        if(!$toDoList){
            return response()->json(['message' => 'Task not found'], Response::HTTP_NOT_FOUND);
        }

        $toDoList->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}
