<?
namespace App\Services\DailyRecord;

use App\Repositories\DailyRecord\DailyRecordRepositoryInterface;
use Illuminate\Validation\ValidationException;

class DailyRecordStoreService
{
    private $repository;

    public function __construct(DailyRecordRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function execute(int $userId, array $data)
    {
        $data['user_id'] = $userId;
        $data['date'] = $data['date'] ?: today();

        return $this->repository->store($data);
    }
}
