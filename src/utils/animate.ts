import BezierEasing from 'bezier-easing';

const calculateBetweenValue = (a: number, b: number, state: number) => {
  return a * (1 - state) + b * state;
}

const calculateBetween = (a: Record<string, number>, b: Record<string, number>, state: number) => {
  if (JSON.stringify(Object.keys(a)) !== JSON.stringify(Object.keys(b)) || a === null) {
    throw new Error('Object must be equal');
  }

  return Object.fromEntries(Object.entries(a).map(([aKey, aValue]) => {
    return [aKey, calculateBetweenValue(aValue, (b as Record<string, number>)[aKey], state)];
  }))
}

export const animate = (
  variablesChangeFrom: Record<string, number>,
  variablesChangeTo: Record<string, number>,
  animationTime: number,
  animationFunction: (x: number) => number,
  animationCallback: (currentAnimationState:  Record<string, number>) => void,
  onAnimationEnd?: () => void,
) => {
  const animationStartTime = Date.now();

  const animateFrame = () => {
    const curTime = Date.now();
    const curAnimationTime = curTime - animationStartTime;
    let animationPosition = curAnimationTime / animationTime;

    if (animationPosition <= 1) {
      if (animationPosition > 1) {
        animationPosition = 1;
      }

      window.requestAnimationFrame(() => {
        animationCallback(calculateBetween(variablesChangeFrom, variablesChangeTo, animationFunction(animationPosition)));
        animateFrame();
      });
    } else if (onAnimationEnd) {
      onAnimationEnd();
    }
  }
  animateFrame();
}

export const easeOut = BezierEasing(0, 0, 0.58, 1);
