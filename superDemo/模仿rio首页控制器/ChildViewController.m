//
//  ChildViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/16.
//  Copyright © 2016年 Rany. All rights reserved.
//
#define kNavigationBarHeight 64

#define kTopVieHeight 250

#import "ChildViewController.h"
#import "RNSlideViewController.h"

@interface ChildViewController ()<UITableViewDelegate,UITableViewDataSource>

@property (nonatomic,strong) UITableView *tableView;

@end

@implementation ChildViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.tableView = [[UITableView alloc]initWithFrame:CGRectMake(0, kNavigationBarHeight, SCREEN_WIDTH, SCREEN_HEIGHT-kNavigationBarHeight) style:UITableViewStylePlain];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    self.tableView.contentInset = UIEdgeInsetsMake(kTopVieHeight - kNavigationBarHeight, 0, 0, 0);

    [self.view addSubview:self.tableView];

}

#pragma mark - tabelView delegate & dataSource

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{

    return 1;
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{

    return 20;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{

    static NSString *cellID = @"cellId";

    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellID];

    if (!cell) {

        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleValue1 reuseIdentifier:cellID];


    }


    //奇偶数行cell颜色显示不同
    if (indexPath.row %2 ==0) {

        cell.backgroundColor = [UIColor colorWithHexString:@"f7fafb"];
    }
    else{

        cell.backgroundColor = [UIColor whiteColor];
    }


    return cell;
}



-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{

    return 80;
}


-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{

}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    
    if (section == 0) {
        
        
    }
    
    return nil;
    
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    
    if (self.delegate) {
        
        [self.delegate didScroll:scrollView];
    }
}


@end
