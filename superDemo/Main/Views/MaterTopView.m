//
//  MaterTopView.m
//  SuperDemo
//
//  Created by Rany on 16/8/24.
//  Copyright © 2016年 Rany. All rights reserved.
//
#define kSelfWidth  self.frame.size.width
#define kSelfHeight self.frame.size.height
#define kNavigationBarHeight 60
#import "MaterTopView.h"


@interface MaterTopView ()

@property (nonatomic,strong) UIButton *leftButton;

@property (nonatomic,strong) UIButton *rightButton;

@property (nonatomic,strong) UIButton *roundButton;

@property (nonatomic,strong) UIView *bgView;

@property (nonatomic,strong) UILabel *titleLabel;

@property (nonatomic,strong) UILabel *detailLabel;


@end

@implementation MaterTopView


- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    
    if (self) {
        
        self.frame = frame;
        
        [self setupUI];
    }
    
    return self;
}

- (void)setupUI
{
    //bgColor
    self.backgroundColor = [UIColor clearColor];
    
    [self insertSubview:self.bgView atIndex:0];
    
    [self addSubview:self.leftButton];
    
    [self addSubview:self.rightButton];
    
    [self.bgView addSubview:self.titleLabel];
    
    [self.bgView addSubview:self.detailLabel];
    
    [self.bgView addSubview: self.roundButton];

}

#pragma mark - getter

-(UIButton *)leftButton
{
    if (!_leftButton) {
        
        _leftButton = [[UIButton alloc]initWithFrame:CGRectMake(20, 30, 20, 12)];
        
        [_leftButton setBackgroundImage:[UIImage imageNamed:@"menuButton"] forState:UIControlStateNormal];
        
        [_leftButton addTarget:self action:@selector(leftButtonAction) forControlEvents:UIControlEventTouchUpInside];
        
    }
    
    return _leftButton;
}


-(UIButton *)rightButton
{
    if (!_rightButton) {
        
        _rightButton = [[UIButton alloc]initWithFrame:CGRectMake(self.frame.size.width - 20 - 10, 30, 5, 20)];
        
        [_rightButton setBackgroundImage:[UIImage imageNamed:@"moreButton"] forState:UIControlStateNormal];
        
        [_rightButton addTarget:self action:@selector(rightButtonAction) forControlEvents:UIControlEventTouchUpInside];
        
    }
    
    return _rightButton;
}

-(UIButton *)roundButton
{
    if (!_roundButton) {
        
        _roundButton = [[UIButton alloc]initWithFrame:CGRectMake(self.frame.size.width - 20 - 67, CGRectGetMaxY(self.bgView.frame)-33.5, 67, 67)];
        
        [_roundButton setBackgroundImage:[UIImage imageNamed:@"roundButton"] forState:UIControlStateNormal];
        
        [_roundButton addTarget:self action:@selector(rightButtonAction) forControlEvents:UIControlEventTouchUpInside];
    }
    
    return _roundButton;
}

-(UIView *)bgView
{
    if (!_bgView) {
        
        _bgView = [[UIView alloc]initWithFrame:CGRectMake(0, 0, self.frame.size.width, self.frame.size.height-33.5)];
        
        _bgView.backgroundColor = [UIColor colorWithHexString:@"#03A9F4"];
        
        
    }
    
    return _bgView;
}

-(UILabel *)titleLabel
{
    if (!_titleLabel) {
        
        _titleLabel = [[UILabel alloc]initWithFrame:CGRectMake(CGRectGetMaxX(self.leftButton.frame), self.leftButton.bottom+25, self.width-CGRectGetMaxX(self.leftButton.frame), 30)];
        
        _titleLabel.font = [UIFont systemFontOfSize:30];
        
        _titleLabel.textColor = [UIColor whiteColor];
        
        
    }
    
    return _titleLabel;
}

-(UILabel *)detailLabel
{
    if (!_detailLabel) {
        
        _detailLabel = [[UILabel alloc]initWithFrame:CGRectMake(self.titleLabel.x, CGRectGetMaxY(self.titleLabel.frame)+5, self.titleLabel.width, self.titleLabel.height)];
        
        _detailLabel.textColor = [UIColor colorWithHexString:@"#B3E5FC"];

    }
    
    return _detailLabel;
}

#pragma mark - setter
-(void)setMainTitle:(NSString *)mainTitle
{
    _mainTitle = mainTitle;
    
    self.titleLabel.text = mainTitle;
}

-(void)setDetailTitle:(NSString *)detailTitle
{
    _detailTitle = detailTitle;
    
    self.detailLabel.text = detailTitle;
}

#pragma mark - buttonAction

- (void)leftButtonAction
{
  
}

- (void)rightButtonAction
{
    
}


-(void)reloadViewWithScrollView:(UIScrollView *)scrollView
{
    
    CGFloat offsetY = floor(scrollView.contentOffset.y + self.frame.size.height-20);
    
    
//    NSLog(@"%f",offsetY);
    
    CGFloat centerX = kSelfWidth / 2;
    CGFloat centerY = (kSelfHeight + offsetY) / 2;
    CGFloat offset = floor(MIN(offsetY / 2, kSelfHeight/2));
//            NSLog(@"%f",offset);

    if (offsetY > 0) {
        self.top = -offset;
        
        self.leftButton.top = offset + 30;
        
        self.rightButton.top = offset + 30;
        
        // 每移动1像素需要改变的比例
        CGFloat kEachPixel = (1 - self.titleLabel.height / self.titleLabel.width) / (kSelfHeight - kNavigationBarHeight);
        CGFloat kScale = MAX((1 - offsetY * kEachPixel),0.6);
//        NSLog(@">>>>>>%f",kScale);
        if (kScale == 0.6f) {
            
            self.titleLabel.top = self.leftButton.top;

        }
        
        self.titleLabel.transform = CGAffineTransformMakeScale(kScale, kScale);
    
        self.detailLabel.alpha = 1-offsetY/100;

    }
    else{
        
        self.top = 0;
        
        self.leftButton.top =  30;
        self.rightButton.top = 30;
        self.titleLabel.top = self.leftButton.bottom+25;
        self.titleLabel.transform = CGAffineTransformMakeScale(1, 1);
        self.detailLabel.alpha = 1.0f;
    }
    
 

}

@end
