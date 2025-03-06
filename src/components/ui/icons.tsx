import { TypeIconsProps } from '@/types';

const IconFavoriteWhite = ({ height, width }: TypeIconsProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '100%'}
      height={height || '100%'}
      viewBox='0 0 15 14'
      fill='none'>
      <path
        d='M4.42871 1.55237L4.94756 0.697502L4.42871 0.382594L3.90986 0.697502L4.42871 1.55237ZM7.42871 3.37318L6.90986 4.22804L7.42871 4.54295L7.94756 4.22804L7.42871 3.37318ZM1.42871 3.37318L0.909862 2.51831L0.428711 2.81034V3.37318H1.42871ZM1.42871 7.27491H0.428711V7.73644L0.779914 8.03587L1.42871 7.27491ZM7.42871 12.3905L6.77991 13.1515L7.42871 13.7046L8.07751 13.1515L7.42871 12.3905ZM13.4287 7.27491L14.0775 8.03587L14.4287 7.73644V7.27491H13.4287ZM13.4287 3.37318H14.4287V2.81034L13.9476 2.51831L13.4287 3.37318ZM10.4287 1.55237L10.9476 0.697502L10.4287 0.382594L9.90986 0.697502L10.4287 1.55237ZM3.90986 2.40723L6.90986 4.22804L7.94756 2.51831L4.94756 0.697502L3.90986 2.40723ZM1.94756 4.22804L4.94756 2.40723L3.90986 0.697502L0.909862 2.51831L1.94756 4.22804ZM2.42871 7.27491V3.37318H0.428711V7.27491H2.42871ZM8.07751 11.6296L2.07751 6.51395L0.779914 8.03587L6.77991 13.1515L8.07751 11.6296ZM8.07751 13.1515L14.0775 8.03587L12.7799 6.51395L6.77991 11.6296L8.07751 13.1515ZM14.4287 7.27491V3.37318H12.4287V7.27491H14.4287ZM13.9476 2.51831L10.9476 0.697502L9.90986 2.40723L12.9099 4.22804L13.9476 2.51831ZM9.90986 0.697502L6.90986 2.51831L7.94756 4.22804L10.9476 2.40723L9.90986 0.697502Z'
        fill='white'
      />
    </svg>
  );
};

const IconFavoriteRed = ({ height, width }: TypeIconsProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '100%'}
      height={height || '100%'}
      viewBox='0 0 24 22'
      fill='none'>
      <path
        d='M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z'
        fill='#EC1D24'
      />
    </svg>
  );
};

const IconSearch = ({ height, width }: TypeIconsProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '100%'}
      height={height || '100%'}
      viewBox='0 0 13 13'
      fill='none'>
      <path
        d='M11.9062 10.9893C12.0234 11.1064 12.0234 11.2939 11.9062 11.3877L11.3672 11.9268C11.2734 12.0439 11.0859 12.0439 10.9688 11.9268L8.13281 9.09082C8.08594 9.02051 8.0625 8.9502 8.0625 8.87988V8.5752C7.19531 9.30176 6.09375 9.74707 4.875 9.74707C2.17969 9.74707 0 7.56738 0 4.87207C0 2.2002 2.17969 -0.00292969 4.875 -0.00292969C7.54688 -0.00292969 9.75 2.2002 9.75 4.87207C9.75 6.09082 9.28125 7.21582 8.55469 8.05957H8.85938C8.92969 8.05957 9 8.10645 9.07031 8.15332L11.9062 10.9893ZM4.875 8.62207C6.9375 8.62207 8.625 6.95801 8.625 4.87207C8.625 2.80957 6.9375 1.12207 4.875 1.12207C2.78906 1.12207 1.125 2.80957 1.125 4.87207C1.125 6.95801 2.78906 8.62207 4.875 8.62207Z'
        fill='black'
      />
    </svg>
  );
};

export { IconFavoriteWhite, IconFavoriteRed, IconSearch };
