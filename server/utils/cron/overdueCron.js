// cron/overdueCron.js
const cron = require('node-cron');
const Loan = require('../../models/loan.model');

cron.schedule('0 0 * * *', async () => {     // every night at 00:00
  await Loan.updateMany(
    { loan_status: 'active', due_date: { $lte: new Date() } },
    [
      {
        $set: {
          overdue_days: {
            $dateDiff: {
              startDate: '$due_date',
              endDate:   '$$NOW',
              unit:      'day'
            }
          }
        }
      }
    ]
  );
  console.log('✅ overdue_days updated');
});
