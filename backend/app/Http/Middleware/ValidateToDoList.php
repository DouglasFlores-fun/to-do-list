<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateToDoList
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $request->validate([
            'task' => 'required|string|max:255',
            'group_id' => 'required|exists:to_do_groups,id',
        ]);

        return $next($request);
    }
}
