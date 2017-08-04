//
//  StarLoadingView.m
//
//  Code generated using QuartzCode 1.57.0 on 2017/7/20.
//  www.quartzcodeapp.com
//

#import "StarLoadingView.h"
#import "QCMethod.h"

@interface StarLoadingView ()

@property (nonatomic, assign) BOOL  updateLayerValueForCompletedAnimation;
@property (nonatomic, assign) BOOL  animationAdded;
@property (nonatomic, strong) NSMapTable * completionBlocks;
@property (nonatomic, strong) NSMutableDictionary * layers;


@end

@implementation StarLoadingView

#pragma mark - Life Cycle

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setupProperties];
        [self setupLayers];
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder
{
    self = [super initWithCoder:coder];
    if (self) {
        [self setupProperties];
        [self setupLayers];
    }
    return self;
}

- (void)setUntitled1AnimProgress:(CGFloat)untitled1AnimProgress{
    if(!self.animationAdded){
        [self removeAllAnimations];
        [self addUntitled1Animation];
        self.animationAdded = YES;
        self.layer.speed = 0;
        self.layer.timeOffset = 0;
    }
    else{
        CGFloat totalDuration = 0.96;
        CGFloat offset = untitled1AnimProgress * totalDuration;
        self.layer.timeOffset = offset;
    }
}

- (void)setFrame:(CGRect)frame{
    [super setFrame:frame];
    [self setupLayerFrames];
}

- (void)setBounds:(CGRect)bounds{
    [super setBounds:bounds];
    [self setupLayerFrames];
}

- (void)setupProperties{
    self.completionBlocks = [NSMapTable mapTableWithKeyOptions:NSPointerFunctionsOpaqueMemory valueOptions:NSPointerFunctionsStrongMemory];;
    self.layers = [NSMutableDictionary dictionary];
    self.updateLayerValueForCompletedAnimation = YES;
    
}

- (void)setupLayers{
    CAShapeLayer * star = [CAShapeLayer layer];
    CAGradientLayer * starGradient = [CAGradientLayer layer];
    [star addSublayer:starGradient];
    [self.layer addSublayer:star];
    self.layers[@"star"] = star;
    self.layers[@"starGradient"] = starGradient;
    
    [self resetLayerPropertiesForLayerIdentifiers:nil];
    [self setupLayerFrames];
}

- (void)resetLayerPropertiesForLayerIdentifiers:(NSArray *)layerIds{
    [CATransaction begin];
    [CATransaction setDisableActions:YES];
    
    if(!layerIds || [layerIds containsObject:@"star"]){
        CAShapeLayer * star = self.layers[@"star"];
        [star setValue:@(-113.52 * M_PI/180) forKeyPath:@"transform.rotation"];
        star.fillColor                  = nil;
        star.strokeColor                = [UIColor yellowColor].CGColor;
        
        CAGradientLayer * starGradient = self.layers[@"starGradient"];
        CAShapeLayer * starMask         = [CAShapeLayer layer];
        starMask.path                   = star.path;
        starGradient.mask               = starMask;
        starGradient.frame              = star.bounds;
        starGradient.colors             = @[(id)[UIColor yellowColor].CGColor, (id)[UIColor whiteColor].CGColor];
    }
    
    [CATransaction commit];
}

- (void)setupLayerFrames{
    [CATransaction begin];
    [CATransaction setDisableActions:YES];
    
    CAShapeLayer * star            = self.layers[@"star"];
    star.transform                 = CATransform3DIdentity;
    star.frame                     = CGRectMake(0.375 * CGRectGetWidth(star.superlayer.bounds), 0.375 * CGRectGetHeight(star.superlayer.bounds), 0.25 * CGRectGetWidth(star.superlayer.bounds), 0.25 * CGRectGetHeight(star.superlayer.bounds));
    [star setValue:@(-113.52 * M_PI/180) forKeyPath:@"transform.rotation"];
    star.path                      = [self starPathWithBounds:star.bounds].CGPath;
    CAGradientLayer * starGradient = self.layers[@"starGradient"];
    starGradient.frame             = star.bounds;
    ((CAShapeLayer *)starGradient.mask).path = star.path;
    
    [CATransaction commit];
}

#pragma mark - Animation Setup

- (void)addUntitled1Animation{
    [self resetLayerPropertiesForLayerIdentifiers:@[@"star"]];
    
    self.layer.speed = 1;
    self.animationAdded = NO;
    
    NSString * fillMode = kCAFillModeForwards;
    
    ////An infinity animation
    
    ////Star animation
    CAKeyframeAnimation * starEndPointAnim = [CAKeyframeAnimation animationWithKeyPath:@"endPoint"];
    starEndPointAnim.values                = @[[NSValue valueWithCGPoint:CGPointMake(0.5, 1)],
                                               [NSValue valueWithCGPoint:CGPointMake(0.5, 0)]];
    starEndPointAnim.duration              = 0.956;
    starEndPointAnim.autoreverses          = YES;
    
    CAShapeLayer * star = self.layers[@"star"];
    
    CAKeyframeAnimation * starTransformAnim = [CAKeyframeAnimation animationWithKeyPath:@"transform.rotation.z"];
    starTransformAnim.values         = @[@(-113.52 * M_PI/180),
                                         @(-360 * M_PI/180)];
    starTransformAnim.keyTimes       = @[@0, @1];
    starTransformAnim.duration       = 0.953;
    starTransformAnim.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseIn];
    starTransformAnim.autoreverses   = YES;
    
    CAAnimationGroup * starUntitled1Anim = [QCMethod groupAnimations:@[starTransformAnim] fillMode:fillMode];
    starUntitled1Anim.repeatCount = INFINITY;
    [star addAnimation:starUntitled1Anim forKey:@"starUntitled1Anim"];
    CAAnimationGroup * starGradientUntitled1Anim = [QCMethod groupAnimations:@[starEndPointAnim] fillMode:fillMode];
    [self.layers[@"starGradient"] addAnimation:starGradientUntitled1Anim forKey:@"starGradientUntitled1Anim"];
}

#pragma mark - Animation Cleanup

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag{
    void (^completionBlock)(BOOL) = [self.completionBlocks objectForKey:anim];;
    if (completionBlock){
        [self.completionBlocks removeObjectForKey:anim];
        if ((flag && self.updateLayerValueForCompletedAnimation) || [[anim valueForKey:@"needEndAnim"] boolValue]){
            [self updateLayerValuesForAnimationId:[anim valueForKey:@"animId"]];
            [self removeAnimationsForAnimationId:[anim valueForKey:@"animId"]];
        }
        completionBlock(flag);
    }
}

- (void)updateLayerValuesForAnimationId:(NSString *)identifier{
    if([identifier isEqualToString:@"Untitled1"]){
        [QCMethod updateValueFromPresentationLayerForAnimation:[self.layers[@"star"] animationForKey:@"starUntitled1Anim"] theLayer:self.layers[@"star"]];
    }
}

- (void)removeAnimationsForAnimationId:(NSString *)identifier{
    if([identifier isEqualToString:@"Untitled1"]){
        [self.layers[@"star"] removeAnimationForKey:@"starUntitled1Anim"];
    }
    self.layer.speed = 1;
}

- (void)removeAllAnimations{
    [self.layers enumerateKeysAndObjectsUsingBlock:^(id key, CALayer *layer, BOOL *stop) {
        [layer removeAllAnimations];
    }];
    self.layer.speed = 1;
}

#pragma mark - Bezier Path

- (UIBezierPath*)starPathWithBounds:(CGRect)bounds{
    UIBezierPath *starPath = [UIBezierPath bezierPath];
    CGFloat minX = CGRectGetMinX(bounds), minY = CGRectGetMinY(bounds), w = CGRectGetWidth(bounds), h = CGRectGetHeight(bounds);
    
    [starPath moveToPoint:CGPointMake(minX + 0.29282 * w, minY + 0.24853 * h)];
    [starPath addCurveToPoint:CGPointMake(minX + 0.16621 * w, minY + 0.65263 * h) controlPoint1:CGPointMake(minX + 0.06378 * w, minY + 0.28304 * h) controlPoint2:CGPointMake(minX + -0.16526 * w, minY + 0.31756 * h)];
    [starPath addCurveToPoint:CGPointMake(minX + 0.49768 * w, minY + 0.90238 * h) controlPoint1:CGPointMake(minX + 0.12709 * w, minY + 0.8892 * h) controlPoint2:CGPointMake(minX + 0.08796 * w, minY + 1.12576 * h)];
    [starPath addCurveToPoint:CGPointMake(minX + 0.82915 * w, minY + 0.65263 * h) controlPoint1:CGPointMake(minX + 0.70254 * w, minY + 1.01407 * h) controlPoint2:CGPointMake(minX + 0.9074 * w, minY + 1.12576 * h)];
    [starPath addCurveToPoint:CGPointMake(minX + 0.70254 * w, minY + 0.24853 * h) controlPoint1:CGPointMake(minX + 0.99488 * w, minY + 0.48509 * h) controlPoint2:CGPointMake(minX + 1.16062 * w, minY + 0.31756 * h)];
    [starPath addCurveToPoint:CGPointMake(minX + 0.29282 * w, minY + 0.24853 * h) controlPoint1:CGPointMake(minX + 0.60011 * w, minY + 0.0333 * h) controlPoint2:CGPointMake(minX + 0.49768 * w, minY + -0.18194 * h)];
    [starPath closePath];
    [starPath moveToPoint:CGPointMake(minX + 0.29282 * w, minY + 0.24853 * h)];
    
    return starPath;
}


@end
