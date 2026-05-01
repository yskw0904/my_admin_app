<?
namespace App\Repositories\Activity;

use App\Models\Activity;

class EloquestActivityRepository implements ActivityRepositoryInterface
{
    public function store(array $data): Activity
    {
        return Activity::query()->create($data);
    }

    public function isOverlapping(int $userId, string $start, string $end): bool
    {
        return Activity::where('user_id', $userId)
            ->where('start_time', '<', $end)
            ->where('end_time', '>', $start)
            ->exists();
    }
}
