//
//  ExpendHeaderView.m
//  myApp
//
//  Created by IMac on 16/4/6.
//  Copyright © 2016年 IMac. All rights reserved.
//

#import "ExpendHeaderView.h"

//按比例获取字体大小 以iphone5屏幕为基准
#define  WGiveFontSize(SIZE) SIZE * [UIScreen mainScreen].bounds.size.width/320.0

#define kInfoTitle @[@"正常率",@"正常次数",@"异常次数"]

@interface ExpendHeaderView ()

{
    UIView *_tempView;
    
    UIImageView *_arrowView;
}

@end

@implementation ExpendHeaderView

- (instancetype)initWithFrame:(CGRect)frame
                     andTitle:(NSString *)title
            andInfoArr:(NSArray *)infoArr
                       isShow:(BOOL)isShow
{
    self = [super initWithFrame:frame];
    
    if (self) {
        
        self.backgroundColor = [UIColor whiteColor];
        
        //HeaderView标题
        
        CGFloat width = self.frame.size.width;
        
        CGFloat height = self.frame.size.height;
        
        CGFloat titleLabelWidth = width/4;
        
        UILabel *titleLabel = [[UILabel alloc]initWithFrame:CGRectMake(10, 0, titleLabelWidth, height)];
        
        titleLabel.textColor = [UIColor colorWithRed:0.2941 green:0.6549 blue:0.9059 alpha:1.0];
        
        titleLabel.textAlignment = NSTextAlignmentLeft;
        
        titleLabel.font = [UIFont systemFontOfSize:WGiveFontSize(14)];
        
        titleLabel.text = title;
        
        [self addSubview:titleLabel];
        
        // 箭头
        
        CGFloat arrowWidth = 14.0f;
        
        CGFloat arrowHeigh = 9.0f;
        
        _arrowView = [[UIImageView alloc]initWithImage:[UIImage imageNamed:@"account_arrows.png"]];
        
        _arrowView.frame = CGRectMake(width-25, (height-arrowWidth)/2, arrowWidth, arrowHeigh);
        
        [self addSubview:_arrowView];
        
        
        //@"正常率",@"正常次数",@"异常次数"
        
        CGFloat tempWidth = width/4*3-25;
        
        _tempView = [[UIView alloc]initWithFrame:CGRectMake(titleLabelWidth, 0, tempWidth, height)];
        
        _tempView.backgroundColor = [UIColor whiteColor];
        
        [self addSubview:_tempView];
        
        CGFloat labelWidth = tempWidth/kInfoTitle.count;
        
        CGFloat labelHeigh = height/2;
        
        [kInfoTitle enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
           
            UILabel *label = [[UILabel alloc]init];
            
            label.frame = CGRectMake(idx*labelWidth, labelHeigh, labelWidth, labelHeigh);
            
            label.font = [UIFont systemFontOfSize:WGiveFontSize(12)];
            
            label.textColor = [UIColor blackColor];
            
            label.textAlignment = NSTextAlignmentCenter;
            
            label.text = obj;
            
            [_tempView addSubview:label];
            
        }];
        
        
        [infoArr enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
           
            UILabel *label = [[UILabel alloc]init];
            
            label.frame = CGRectMake(idx*labelWidth, 0, labelWidth, labelHeigh);
            
            label.font = [UIFont systemFontOfSize:14];
            
            label.textColor = [UIColor blackColor];
            
            label.textAlignment = NSTextAlignmentCenter;
            
            label.text = obj;
            
            [_tempView addSubview:label];

        }];
        
        //是否隐藏
        _tempView.hidden = !isShow;
   
        //是否旋转
        [self setArrowImageViewWithIfUnfold:!isShow];
        
    }
    
    
    
    return self;
}



/**
 *   设置图片箭头旋转
 */
-(void)setArrowImageViewWithIfUnfold:(BOOL)unfold
{
    double degree;
    
    if(unfold){
        
        degree = M_PI;
        
    } else {
        
        degree = 0;
        
    }
    
    _arrowView.layer.transform = CATransform3DMakeRotation(degree, 0, 0, 1);
    
//    [UIView animateWithDuration:0.2
//                          delay:0
//                        options:UIViewAnimationOptionAllowUserInteraction
//                     animations:^{
//                         
//                            _arrowView.layer.transform = CATransform3DMakeRotation(degree, 0, 0, 1);
//    
//                     } completion:NULL];
}

@end
