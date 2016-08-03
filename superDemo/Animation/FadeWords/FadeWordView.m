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

@property (nonatomic,strong) UIView *mask;

@end

@implementation FadeWordView

-(instancetype)initWithFrame:(CGRect)frame
{
    
    self = [super initWithFrame:frame];
    
    if (self) {
//        self.backgroundColor = [UIColor greenColor];
        
        [self createLabel:self.bounds];
        
        [self createMask:self.bounds];
    }
    
    return self;
}


- (void)createLabel:(CGRect)frame {
    
    UILabel *bgLabel = [[UILabel alloc]initWithFrame:frame];
    
    bgLabel.text = @"Hello World";
    bgLabel.font = [UIFont systemFontOfSize:30.f];
    bgLabel.textAlignment = NSTextAlignmentCenter;
    bgLabel.textColor     = [UIColor greenColor];
    [self addSubview:bgLabel];
    
    self.label               = [[UILabel alloc] initWithFrame:frame];
    self.label.font          = [UIFont systemFontOfSize:30.f];
    self.label.textAlignment = NSTextAlignmentCenter;
    self.label.textColor     = [UIColor redColor];
    
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
    
    gradientLayer.locations = @[@(0.01),@(0.1),@(0.9),@(0.99)];
    
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
            
            frame.origin.x += frame.size.width;
            
            self.mask.frame = frame;
            
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
}
@end
