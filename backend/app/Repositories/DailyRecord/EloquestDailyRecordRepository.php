<?
namespace App\Repositories\DailyRecord;

use App\Models\DailyRecord;

class EloquestDailyRecordRepository implements DailyRecordRepositoryInterface
{
    public function store(array $data): DailyRecord
    {
        return DailyRecord::query()->firstOrCreate($data);
    }
}
