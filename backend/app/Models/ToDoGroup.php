<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoGroup extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function task()
    {
        return $this->hasMany(ToDoList::class, 'group_id');
    }
}
