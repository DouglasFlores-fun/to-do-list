<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoList extends Model
{
    use HasFactory;
    protected $fillable = ['groupId', 'description', 'isOpen'];

    protected $casts = [
        'isOpen' => 'boolean',
    ];

    public function group()
    {
        return $this->belongsTo(ToDoGroup::class, 'groupId');
    }
}
