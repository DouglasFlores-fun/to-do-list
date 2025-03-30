<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class ToDoList extends Model
{
    use HasFactory;
    protected $casts = [
        'due_date' => 'datetime', // Ensures Laravel treats it correctly
    ];

    public function getDueDateAttribute($value)
    {
        return Carbon::parse($value)->setTimezone(config('app.timezone'));
    }

    protected $fillable = ['title', 'description', 'completed', 'due_date'];
}
