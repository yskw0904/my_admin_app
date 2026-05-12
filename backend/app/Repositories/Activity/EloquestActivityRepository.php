<?
namespace App\Repositories\Activity;

use App\Models\Activity;
use App\Models\DailyRecord;

class EloquestActivityRepository implements ActivityRepositoryInterface
{
    public function store(array $data): Activity
    {
        return Activity::create($data);
    }

    public function isOverlapping(int $dailyRecordId, string $start, string $end): bool
    {
        return Activity::where('daily_record_id', $dailyRecordId)
            ->where('start_time', '<', $end)
            ->where('end_time', '>', $start)
            ->exists();
    }
}
