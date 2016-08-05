//
//  RNProgressHUD.m
//  SuperDemo
//
//  Created by Rany on 16/8/5.
//  Copyright © 2016年 Rany. All rights reserved.
//

#define KDuration 2

#import "RNProgressHUD.h"

@interface RNProgressHUD ()

@property (nonatomic,strong) CAShapeLayer *shapeLayer;

@property (nonatomic,strong) CABasicAnimation *strokeAnimationStart; //ShapeLyer 的StrokeStart 动画

@property (nonatomic,strong) CABasicAnimation *strokeAnimationEnd;  //ShapeLyer 的StrokeEnd 动画

@property (nonatomic,strong) CABasicAnimation *rotateAnimation;     //旋转动画

@property (nonatomic,strong) CAAnimationGroup *animationGroup;



@end

@implementation RNProgressHUD


-(instancetype)initWithFrame:(CGRect)frame
{
    
    self = [super initWithFrame:frame];
    
    if (self) {
        
        
        [self.layer addSublayer:self.shapeLayer];
        
        
    }
    
    return self;
}


- (CAShapeLayer *)shapeLayer
{
    
    if (!_shapeLayer) {
        
        _shapeLayer = [CAShapeLayer layer];
        
        _shapeLayer.frame = self.bounds;
        
        _shapeLayer.position = self.center;
        
        _shapeLayer.strokeColor = [UIColor colorWithRed:1.0 green:0.4 blue:0.2 alpha:1.0].CGColor;
        
        _shapeLayer.strokeEnd = 0;
        
        _shapeLayer.strokeStart = 0;
        
        _shapeLayer.lineWidth = 2.0f;
        
        _shapeLayer.fillColor = [UIColor clearColor].CGColor;
        
        _shapeLayer.lineCap = kCALineCapRound;
        
        _shapeLayer.path = [UIBezierPath bezierPathWithOvalInRect:self.bounds].CGPath;

        
        
    }
    
    return _shapeLayer;
}


-(CABasicAnimation *)rotateAnimation
{
    
    if (!_rotateAnimation) {
        
        
        _rotateAnimation = [CABasicAnimation animation];
        
        _rotateAnimation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
        
        _rotateAnimation.keyPath = @"transform.rotation.z";
        
        _rotateAnimation.fromValue = @0;
        
        _rotateAnimation.toValue = @(2*M_PI);
        
        _rotateAnimation.duration = KDuration/2;
        
        _rotateAnimation.repeatCount = HUGE;
        
        _rotateAnimation.removedOnCompletion = NO;
        
    }
    
    return _rotateAnimation;
}


-(CABasicAnimation *)strokeAnimationEnd
{
    if (!_strokeAnimationEnd) {
        
        _strokeAnimationEnd = [CABasicAnimation animationWithKeyPath:@"strokeEnd"];
        
        _strokeAnimationEnd.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
        
        _strokeAnimationEnd.fromValue = @0;
        
        _strokeAnimationEnd.toValue = @0.95;
        
        _strokeAnimationEnd.duration = KDuration;
        
        _strokeAnimationEnd.repeatCount = HUGE;
        
        _strokeAnimationEnd.fillMode = kCAFillModeForwards;
        
        _strokeAnimationEnd.removedOnCompletion = NO;
        
    }
    
    return _strokeAnimationEnd;
}

-(CABasicAnimation *)strokeAnimationStart
{
    
    if (!_strokeAnimationStart) {
        
        _strokeAnimationStart = [CABasicAnimation animationWithKeyPath:@"strokeStart"];
        
        _strokeAnimationStart.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
        
        _strokeAnimationStart.fromValue = @0;
        
        _strokeAnimationStart.toValue = @0.95;
        
        _strokeAnimationStart.duration = KDuration/2;
        
        _strokeAnimationStart.repeatCount = HUGE;
        
        _strokeAnimationStart.fillMode = kCAFillModeForwards;
        
        _strokeAnimationStart.removedOnCompletion = NO;
        
        _strokeAnimationStart.beginTime = 1;
    }
    
    return _strokeAnimationStart;
    
    
}

-(CAAnimationGroup *)animationGroup
{
    if (!_animationGroup) {
        
        _animationGroup = [CAAnimationGroup animation];
        
        _animationGroup.animations = @[self.strokeAnimationStart,self.strokeAnimationEnd];
        
        _animationGroup.removedOnCompletion = NO;
        
        _animationGroup.fillMode = kCAFillModeForwards;
        
        _animationGroup.repeatCount = HUGE;
        
        _animationGroup.duration = KDuration;
    }
    
    return _animationGroup;
}

-(void)showHUD
{
    [self.shapeLayer addAnimation:self.animationGroup forKey:@"group"];
    
    [self.shapeLayer addAnimation:self.rotateAnimation forKey:@"rotate"];
}

-(void)hideHUD
{
    if (self.rotateAnimation && self.animationGroup) {
        
        
        [self.shapeLayer removeAllAnimations];

    }
}
@end
