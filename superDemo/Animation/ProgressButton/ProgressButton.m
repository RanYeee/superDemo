//
//  ProgressButton.m
//  SuperDemo
//
//  Created by Rany on 16/9/13.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "ProgressButton.h"

@interface ProgressButton ()

@property (nonatomic,strong) UIView *progressView;

@property (nonatomic,strong) UILabel *title_label;

@end

@implementation ProgressButton

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.frame = frame;
        
        [self initUI];
    }
    return self;
}

- (void)initUI
{

    
    self.progressView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, 0, self.frame.size.height)];
    
    self.progressView.backgroundColor = [UIColor lightGrayColor];
    [self addSubview:self.progressView];
    
    self.title_label = [[UILabel alloc]initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height/2)];
    
    self.title_label.center = CGPointMake(self.width/2, self.height/2);
    
    self.title_label.font = [UIFont systemFontOfSize:15];
    
    self.title_label.textColor = [UIColor blackColor];
    
    self.title_label.textAlignment = NSTextAlignmentCenter;
    
    self.title_label.text = @"0";
    
    [self addSubview:self.title_label];
}

- (void)startProgressWithProgress:(CGFloat)progress
{
  
    CGFloat width = (progress/100) * self.width;
    self.progressView.width = width;
    self.title_label.text =  [NSString stringWithFormat:@"%f",progress/100];
    if (self.progressView.width >= self.width) {
        
        self.progressView.width = self.width;
        
        return;
    }

}

@end
