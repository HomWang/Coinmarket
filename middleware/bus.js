import Bus from '~/plugins/bus';

export default function ({isHMR, app, store}) {
  Bus.$off();
}
