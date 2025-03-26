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

        if ($request->has('group_id')) {
            $query->where('group_id', $request->group_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
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
        $request->validate([
            'task' => 'required|string|max:255',
            'group_id' => 'required|exists:to_do_groups,id',
        ]);

        $task = ToDoList::create([
            'task' => $request->task,
            'group_id' => $request->group_id,
            'status' => false,
        ]);

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
        //
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

        if ($request->has('status')) {
            $toDoList->status = $request->status;
        }

        if ($request->has('task')) {
            $toDoList->task = $request->task;
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
