import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// utils
import { fNumber } from '../../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 106, height: 106 };

var TOTAL_CHECK_IN = 38566;
var TOTAL_CHECK_OUT = 18472;
var CHART_DATA_CHECK_IN = [0];
var CHART_DATA_CHECK_OUT = [64];

export default function BookingCheckInWidgets({ size, gray }) {
  var isChecked = 0;
  var notChecked = 0;
  for (var url of gray) {
    if (url.isCheck === 'false') {
      notChecked++;
    } else if (url.isCheck === 'true') {
      isChecked++;
    }
  }
  TOTAL_CHECK_IN = isChecked;
  TOTAL_CHECK_OUT = notChecked;
  CHART_DATA_CHECK_IN = [Number(((isChecked * 100) / size).toFixed(2))];
  CHART_DATA_CHECK_OUT = [Number(((notChecked * 100) / size).toFixed(2))];
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartOptionsCheckIn = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
  });

  const chartOptionsCheckOut = {
    ...chartOptionsCheckIn,
    colors: [theme.palette.chart.yellow[0]],
  };

  return (
    <Card>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider orientation={isDesktop ? 'vertical' : 'horizontal'} flexItem sx={{ borderStyle: 'dashed' }} />
        }
      >
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ width: 1, py: 5 }}>
          <ReactApexChart type="radialBar" series={CHART_DATA_CHECK_IN} options={chartOptionsCheckIn} {...CHART_SIZE} />
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_IN)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Verification
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={3} sx={{ width: 1, py: 5 }}>
          <ReactApexChart
            type="radialBar"
            series={CHART_DATA_CHECK_OUT}
            options={chartOptionsCheckOut}
            {...CHART_SIZE}
          />
          <div>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {fNumber(TOTAL_CHECK_OUT)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.72 }}>
              Reject
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}
