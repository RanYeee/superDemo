//
//  FadeWordView.m
//  SuperDemo
//
//  Created by Rany on 16/8/3.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "FadeWordView.h"

@interface FadeWordView()

@property (nonatomic,strong) UILabel *label;

@property (nonatomic,strong) UILabel *bgLabel;

@property (nonatomic,strong) UIView *mask;

@end

@implementation FadeWordView

-(instancetype)initWithFrame:(CGRect)frame
{
    
    self = [super initWithFrame:frame];
    
    if (self) {
        
        self.backgroundColor = [UIColor clearColor];
        
        [self createBgView:frame];
        
        [self createLabel:frame];
        
        [self createMask:frame];
    }
    
    return self;
}

- (void)createBgView:(CGRect)frame
{
    
    UIView *bgView = [[UIView alloc]initWithFrame:frame];
    
    bgView.backgroundColor = [UIColor colorWithRed:0.5294 green:0.7608 blue:0.7569 alpha:1.0];
    
    bgView.alpha = 0.7f;
    
    bgView.layer.cornerRadius = frame.size.width/4;
    
    [self addSubview:bgView];
    
}

- (void)createLabel:(CGRect)frame {
    
    self.bgLabel = [[UILabel alloc]initWithFrame:frame];
    
    self.bgLabel.font = [UIFont boldSystemFontOfSize:15.f];
    self.bgLabel.textAlignment = NSTextAlignmentCenter;
    self.bgLabel.textColor     = [UIColor colorWithRed:0.9804 green:0.9804 blue:0.9804 alpha:1.0];
    [self addSubview:self.bgLabel];
    
    self.label               = [[UILabel alloc] initWithFrame:frame];
    self.label.font          = [UIFont boldSystemFontOfSize:15.f];
    self.label.textAlignment = NSTextAlignmentCenter;
    self.label.textColor     = [UIColor colorWithRed:0.6 green:0.6 blue:0.6 alpha:1.0];
    [self addSubview:self.label];
}

- (void)createMask:(CGRect)frame
{
    
    CAGradientLayer *gradientLayer = [CAGradientLayer layer];
    
    gradientLayer.frame = frame;
    
    gradientLayer.colors = @[(__bridge id)[UIColor clearColor].CGColor,
                             (__bridge id)[UIColor blackColor].CGColor,
                             (__bridge id)[UIColor blackColor].CGColor,
                             (__bridge id)[UIColor clearColor].CGColor];
    
    gradientLayer.locations = @[@(0.01),@(0.25),@(0.7),@(0.99)];
    
    gradientLayer.startPoint = CGPointMake(0, 0);
    
    gradientLayer.endPoint = CGPointMake(1, 0);
    
    self.mask = [[UIView alloc]initWithFrame:frame];

    [self.mask.layer addSublayer:gradientLayer];
    
    self.label.maskView = self.mask;
    
}

- (void)fadeToRightWithDuration:(NSTimeInterval)duration isAnimation:(BOOL)isAnimation
{
    
    if (isAnimation) {
        
  
        [UIView animateWithDuration:duration animations:^{
            
            CGRect frame    = self.mask.frame;
            
            frame.origin.x += frame.size.width*0.7;
            
            self.mask.frame = frame;
            
        } completion:^(BOOL finished) {
            
          [UIView animateWithDuration:duration animations:^{
              
              CGRect frame    = self.mask.frame;
              
              frame.origin.x -= frame.size.width*0.7;
              
              self.mask.frame = frame;
              
          } completion:^(BOOL finished) {
              
              [self fadeToRightWithDuration:duration isAnimation:isAnimation];
              
          }];
            
        }];
        
    }else{
        
        CGRect frame    = self.mask.frame;
        
        frame.origin.x += frame.size.width;
        
        self.mask.frame = frame;
    }

}

@synthesize text = _text;

-(NSString *)text
{
    return _text;
}

-(void)setText:(NSString *)text
{
    _text = text;
    
    self.label.text = text;
    
    self.bgLabel.text = text;
}
@end
