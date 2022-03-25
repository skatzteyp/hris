import React from 'react';

const EmployeeEvaluation = () => {
  return (
    <div>
      <h2 className="bg-orange-100 text-orange block  p-3 text-sm text-left font-semibold tracking-wide rounded">General Evaluation</h2>

      <table className="mt-10 w-full rounded border border-orange-100">
        <tr style={{ background: '#FEDBB3' }}>
          <th className="p-3 text-sm text-left font-semibold tracking-wide">Items</th>
          <th className="p-3 text-sm text-left font-semibold tracking-wide">Remarks</th>
          <th className="p-3 text-sm text-left font-semibold tracking-wide">Point System Equivalence</th>
        </tr>
        <tr style={{ minHeight: '166px' }}>
          <td className="p-8">Reporting/communication/discussion</td>
          <td className="p-8"></td>
          <td className="p-8"></td>
        </tr>
      </table>
    </div>
  );
}

export default EmployeeEvaluation;
