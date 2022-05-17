<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function getCollections(Request $request)
    {
        try {
            $collections = DB::connection('mongodb')->getMongoDB()->listCollections();
            $names = [];
            foreach ($collections as $collection) {
                $names[] = $collection->getName();
            }

            $names = Arr::sort($names);
            $names = array_values($names);

            return response()->json($names);
        }
        catch (\Exception $e) {
            return response()->json([], 500);
        }
    }

    public function getCollectionData(Request $request, $collection)
    {
        try {
            $data = DB::connection('mongodb')->collection($collection);
            $filters = json_decode($request->get('filters'), true);
            if(!empty($filters)) {
                foreach ($filters as $filter) {
                    switch($filter['type']) {
                        case 'int':
                            $data = $data->where($filter['field'], $filter['operator'], (int)$filter['value']);
                            break;
                        case 'float':
                            $data = $data->where($filter['field'], $filter['operator'], (float)$filter['value']);
                            break;
                        case 'bool':
                            $data = $data->where($filter['field'], $filter['operator'], $filter['value'] == 'true');
                            break;
                        case 'eval':
                            $filter['value'] = 'return ' . $filter['value'] . ';';
                            $data = $data->where($filter['field'], $filter['operator'], eval($filter['value']));
                            break;
                        case 'json':
                            $data = $data->where($filter['field'], $filter['operator'], json_decode($filter['value'], true));
                            break;
                        case 'string':
                        default:
                            $data = $data->where($filter['field'], $filter['operator'], $filter['value']);
                            break;
                    }
                }
            }
            $data = $data->orderBy($request->get('sort', 'created_at'), $request->get('order', 'desc'));
            $data = $data->paginate($request->get('per_page', 50), explode(',', $request->get('fields', '*')));
            return response()->json($data);
        }
        catch (\Exception $e) {
            return response()->json([], 500);
        }
    }
}
