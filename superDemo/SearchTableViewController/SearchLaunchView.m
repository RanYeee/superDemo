//
//  SearchLaunchView.m
//  SuperDemo
//
//  Created by Rany on 2017/8/13.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "SearchLaunchView.h"
#import "SearchEmptyView.h"

@interface SearchLaunchView()

@property(nonatomic, strong) SearchEmptyView *emptyView;

@end

@implementation SearchLaunchView

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.backgroundColor = [UIColor whiteColor];
        self.emptyView = [[SearchEmptyView alloc]init];
        [self addSubview:self.emptyView];
        
        
    }
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        
        self.backgroundColor = [UIColor whiteColor];
        self.emptyView = [[SearchEmptyView alloc]initWithFrame:CGRectMake(0, 0, 100, 100)];
        self.emptyView.center = self.center;
        [self addSubview:self.emptyView];
        [self.emptyView addUntitled1Animation];
    }
    return self;
}

-(void)layoutSubviews
{
    [super layoutSubviews];
    
    self.emptyView.frame = CGRectMake(0, 0, 100, 100);
    self.emptyView.center = self.center;
}

@end
