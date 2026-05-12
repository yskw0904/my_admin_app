<?
namespace App\Services\Activity;

use App\Models\DailyRecord;
use App\Repositories\Activity\ActivityRepositoryInterface;
use Illuminate\Validation\ValidationException;

class ActivityStoreService
{
    private $repository;

    public function __construct(ActivityRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function execute(int $userId, array $data)
    {
        $dailyRecord = DailyRecord::firstOrCreate(
            ['user_id' => $userId, 'date' => $data['date']], // 検索条件
            ['note' => null] // 新規作成時の追加データ
        );
        $dailyRecordId = $dailyRecord->id;

        $isOverlapping = $this->repository->isOverlapping(
            $dailyRecordId,
            $data['start_time'],
            $data['end_time']
        );

        if ($isOverlapping) {
            throw ValidationException::withMessages([
                'start_time' => ['その時間帯には既に別の予定が入っています。'],
            ]);
        }

        $activityData = [
            'daily_record_id' => $dailyRecordId,
            'activity_type'   => $data['activity_type'],
            'start_time'      => $data['start_time'],
            'end_time'        => $data['end_time'],
        ];
        return $this->repository->store($activityData);
    }
}
