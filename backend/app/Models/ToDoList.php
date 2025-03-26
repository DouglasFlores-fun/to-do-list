<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoList extends Model
{
    use HasFactory;
    protected $fillable = ['group_id', 'task', 'status'];

    public function group()
    {
        return $this->belongsTo(ToDoGroup::class, 'group_id');
    }
}
