
export default function BillingInfo() {
  return (
    <div className="section-body flex-col">
      <div className="form-container">
        <div className="flex flex-row gap-4">
          <label className="label-m" htmlFor="payment">
            결제정보
          </label>
          <div className="flex w-full flex-col">
            <table className="table">
              <thead>
                <tr>
                  <th>월 요금</th>
                  <th>사용 시작일</th>
                  <th>다음 결제일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-money">12,000</td>
                  <td>2024/03/31</td>
                  <td>2024/04/30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="btn-container mt-4">
          <button
            className="btn btn-l btn-neutral btn-soft w-[120px]"
            onClick={() => window.openModal?.("modal-unsubscribe")}
          >
            구독 취소
          </button>
          <button
            className="btn btn-l btn-wide btn-primary"
            onClick={() => window.openModal?.("modal-change-payinfo")}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
