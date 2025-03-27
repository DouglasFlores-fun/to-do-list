<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class ValidateStatusAndTask
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
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:100|required_without_all:description,due_date,completed',
            'description' => 'string|max:255|required_without_all:title,due_date,completed',
            'due_date' => 'string|date|required_without_all:title,description,completed',
            'completed' => 'boolean|required_without_all:title,description,due_date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Missing data',
                'messages' => $validator->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return $next($request);
    }
}
