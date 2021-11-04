const getViewportDimensions = () => {
    let width = 0;
    let height = 0;
  
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
      width = window.innerWidth;
      height = window.innerHeight;
    }
  
    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (
      typeof document.documentElement !== 'undefined' &&
      typeof document.documentElement.clientWidth !== 'undefined' &&
      document.documentElement.clientWidth !== 0
    ) {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
    }
  
    // older versions of IE
    else {
      const body = document.getElementsByTagName('body')[0];
      width = body.clientWidth;
      height = body.clientHeight;
    }
  
    return {
      width,
      height,
    };
  };

  const getMobileData = (WIDTH: number, HEIGHT: number) => {    
    const CHOICE_STYLE: Phaser.Types.GameObjects.Text.TextStyle  = {
        align: 'center',
        padding: {
            x: WIDTH / 10,
            y: HEIGHT / 20
        },
        wordWrap: {
            width: WIDTH / 4,
            useAdvancedWrap: true
        },
        fixedWidth: WIDTH / 2.3,
        fontSize: WIDTH / 600 + 'rem',
    }
    const QUESTION_POINT = {
        x: 0,
        y: HEIGHT / 2 - HEIGHT / 4
    }
    const QUESTION_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
        fontSize: WIDTH / 300 + 'rem',
        align: 'center',
        wordWrap: {
            width: WIDTH
        },
        fixedWidth: WIDTH
    }
    
    const CHOICE_1_POINT = { 
        x: WIDTH / 32,
        y: HEIGHT / 2 + HEIGHT / 16
    }
    
    const CHOICE_2_POINT = { 
        x: WIDTH / 2 + WIDTH / 32,
        y: HEIGHT / 2 + HEIGHT / 16
    }
    
    const CHOICE_3_POINT = { 
        x: WIDTH / 32,
        y: HEIGHT / 2 + HEIGHT / 4
    }
    
    const CHOICE_4_POINT = {
        x: WIDTH / 2 + WIDTH / 32,
        y: HEIGHT / 2 + HEIGHT / 4
    }
    
    const TIMER_POINT = {
        // x: WIDTH / 2 - WIDTH / 24,
        // y: HEIGHT / 2 - HEIGHT / 8,
        x: 0,
        y: 0,
    }
    
    const TIMER_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize:  WIDTH / 500 + 'rem',
        padding: {
            x: WIDTH / 64,
            y:  HEIGHT / 32
        },
        fixedWidth: WIDTH / 12,
    }
    
    const START_BUTTON_POINT = {
        // x: WIDTH / 2  - WIDTH / 16,
        // y: HEIGHT / 16,
        x: WIDTH / 2 - WIDTH / 16,
        y: HEIGHT / 2 - HEIGHT / 16
    }
    
    const START_BUTTON_STYLE: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize:  WIDTH / 300 + 'rem',
    }
    return {
        QUESTION: {
            STYLE: QUESTION_STYLE,
            POINT: QUESTION_POINT
        },
        CHOICE: {
            STYLE: CHOICE_STYLE,
            POINTS: {
                A: CHOICE_1_POINT,
                B: CHOICE_2_POINT,
                C: CHOICE_3_POINT,
                D: CHOICE_4_POINT,
            }
        },
        TIMER: {
            STYLE: TIMER_STYLE,
            POINT: TIMER_POINT,
        },
        START_BUTTON: {
            STYLE: START_BUTTON_STYLE,
            POINT: START_BUTTON_POINT
        }
    }
}

const getResponsiveData = () => {
  const { width, height } = getViewportDimensions();
  return getMobileData(width, height);
}

/**
 * Create full path for url, prevent error on subfolder hosting
 * @param input (must not start with /)
 * @returns 
 */
const getFullPath = (input: string) => {
    return import.meta.env.BASE_URL + input
}
export default {
    getViewportDimensions,
    getResponsiveData,
    getFullPath
}