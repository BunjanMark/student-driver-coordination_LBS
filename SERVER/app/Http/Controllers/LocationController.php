<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    private static $sharedLocation = null;

    public function shareLocation(Request $request)
    {
        try {
            // Attempt to retrieve the 'location' input from the request
            $location = $request->input('location');

            // Update the shared location
            self::$sharedLocation = $location;

            // Return a success response
            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getLocation()
    {
        try {
            // Attempt to retrieve the shared location
            $location = self::$sharedLocation;

            // Return the location in the response
            return response()->json(['location' => $location]);
        } catch (\Throwable $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
