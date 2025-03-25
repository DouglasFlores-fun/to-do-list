<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoGroup extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function lists()
    {
        return $this->hasMany(ToDoList::class, 'groupId');
    }
}
