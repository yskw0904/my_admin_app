<?
namespace App\Repositories\Activity;

use App\Models\Activity;

class EloquestActivityRepository implements ActivityRepositoryInterface
{
    public function store(array $data): Activity
    {
        return Activity::query()->create($data);
    }
}
