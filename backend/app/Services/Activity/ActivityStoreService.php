<?
namespace App\Services\Activity;

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
        $isOverlapping = $this->repository->isOverlapping(
            $userId,
            $data['start_time'],
            $data['end_time']
        );

        if ($isOverlapping) {
            throw ValidationException::withMessages([
                'start_time' => ['その時間帯には既に別の予定が入っています。'],
            ]);
        }

        $data['user_id'] = $userId;
        return $this->repository->store($data);
    }
}
