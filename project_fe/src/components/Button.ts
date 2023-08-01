import styled from "styled-components";

const SIZES = {
  Large: 1, // 16px
  Medium: 1, // 16px
  Small: .875, // 14px
};

const HEIGHTSIZES = {
  Large: 3.5, // 56px
  Medium: 3, // 48px
  Small: 2, // 32px
};

type ButtonProps = {
  size: keyof typeof SIZES;
  round?: boolean;
  // 다른 필요한 prop들도 여기에 추가할 수 있습니다.
};

const Button = styled.button<ButtonProps>`
  background-color: var(--light-primary-normal);
  border: none;
  border-radius: ${({ round }) => (round ? `0` : `.25rem`)};
  color: var(--white);
  font-size: ${({ size }) => SIZES[size] ?? SIZES["Small"]}rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0 1rem;
  height: ${({ size }) => HEIGHTSIZES[size] ?? HEIGHTSIZES["Small"]}rem;
  min-width: 4rem;
  max-width: 25rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--light-primary-strong);
  }
  &:active {
    background-color: var(--light-primary-heavy);
  }
`;

export default Button;